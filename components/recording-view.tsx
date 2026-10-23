"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, Lock, RotateCcw, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BisindoOverlay } from "@/components/hand-tracking/bisindo-overlay";


export function RecordingView() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const word = searchParams.get("kata") || "Halo";

    const videoRef = useRef<HTMLVideoElement>(null);
    const [cameraGranted, setCameraGranted] = useState(false);

    useEffect(() => {
        let stream: MediaStream | null = null;

        async function startCamera() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                });
                setCameraGranted(true);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                // Silently handle if user denies or camera is unavailable
                setCameraGranted(false);
            }
        }

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="w-full h-full bg-white flex flex-col relative rounded-[2rem]">
            {/* Top Bar */}
            <div className="w-full p-8 relative flex items-start justify-center">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.back()}
                    className="absolute left-8 top-8 w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors z-10"
                >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </Button>

                <div className="flex flex-col items-center gap-1.5">
                    <Badge
                        variant="outline"
                        className="px-4 py-1.5 border-gray-100 shadow-sm text-[12px] font-bold text-gray-800"
                    >
                        Menyapa
                    </Badge>
                    <span className="text-[13.5px] font-semibold text-gray-500 mt-1">
                        1 dari 3
                    </span>
                    <h1 className="text-[28px] font-bold text-gray-900 leading-none mt-1">
                        {word}
                    </h1>
                </div>
            </div>

            {/* Main Content (Videos) */}
            <div className="flex-1 flex flex-col md:flex-row gap-8 px-8 md:px-12 pb-12 mt-4 items-start justify-center max-w-[1200px] mx-auto w-full">
                {/* Left Side: Reference Video */}
                <div className="flex-1 flex flex-col items-center gap-6 w-full max-w-[500px]">
                    <div className="w-full aspect-4/3 bg-[#00FF00] rounded-[1.5rem] overflow-hidden shadow-md relative flex items-center justify-center">
                    </div>

                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors"
                        >
                            <RotateCcw className="w-5 h-5 text-gray-700" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors"
                        >
                            <span className="text-[14px] font-bold text-gray-700">
                                ×1
                            </span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors"
                        >
                            <Hash className="w-5 h-5 text-gray-700" />
                        </Button>
                    </div>
                </div>

                {/* Right Side: Camera */}
                <div className="flex-1 flex flex-col items-center gap-6 w-full max-w-[500px]">
                    <div
                        className={`relative w-full aspect-4/3 rounded-[1.5rem] overflow-hidden shadow-md transition-colors duration-500 ${cameraGranted ? "bg-black" : "bg-[#3f3f46]"}`}
                    >
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className={`w-full h-full object-cover -scale-x-100 ${cameraGranted ? "block" : "hidden"}`}
                        />

                        {cameraGranted && (
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[220px] pointer-events-none opacity-60">
                                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-tl-[12px]" />
                                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-tr-[12px]" />
                                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-bl-[12px]" />
                                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-br-[12px]" />
                            </div>
                        )}

                        {/* BISINDO AI Overlay — ROI box + prediction badge */}
                        {cameraGranted && <BisindoOverlay videoRef={videoRef} />}
                    </div>

                    <div className="flex items-center gap-2">
                        <Lock className="w-[14px] h-[14px] text-blue-500" />
                        <span className="text-[13px] text-gray-600 font-semibold tracking-wide">
                            Privasi Anda tetap terjaga
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
