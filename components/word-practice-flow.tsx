"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
    Clock,
    ChevronLeft,
    RotateCcw,
    Hash,
    Lock,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function WordsPracticeFlow() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [cameraGranted, setCameraGranted] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Camera handling for step 2
    useEffect(() => {
        let stream: MediaStream | null = null;

        if (step === 2) {
            // Request camera
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
                    setCameraGranted(false);
                }
            }
            startCamera();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [step]);

    if (step === 0 || step === 1) {
        return (
            <div className="w-full min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
                <div className="w-full max-w-[900px] h-[600px] bg-[#fbfbfb] rounded-[2rem] shadow-[0_4px_30px_-6px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-center justify-center relative p-12">
                    {/* Top Avatar */}
                    <div className="absolute top-10 flex justify-center w-full">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center p-1 relative">
                            {/* Assuming an avatar icon or generic user */}
                            <Image
                                src="/mascot_blue.svg"
                                alt="Avatar"
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-10 mt-10">
                        {/* Mascot */}
                        <div className="relative w-64 h-64 shrink-0">
                            <Image
                                src="/mascot_blue.svg"
                                alt="Mascot"
                                fill
                                className="object-contain animate-in zoom-in duration-500"
                            />
                        </div>

                        {/* Chat Bubble */}
                        <div className="bg-white px-8 py-6 rounded-2xl rounded-tl-none shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)] border border-gray-50 max-w-[380px] animate-in fade-in slide-in-from-left-4 duration-500 delay-150 fill-mode-both relative">
                            {/* Speech arrow */}
                            <div className="absolute top-0 -left-3 w-4 h-4 bg-white border-l border-t border-gray-50 transform -skew-x-12" />
                            <p className="text-[17px] font-bold text-gray-700 leading-relaxed">
                                {step === 0
                                    ? "Halo! Hari ini kita akan belajar menyapa dan membuka percakapan."
                                    : "Kata yang akan dipelajari yaitu Halo, Selamat Pagi, Selamat Siang, Selamat Sore dan Selamat Malam"}
                            </p>
                        </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="absolute bottom-10 right-10 flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span className="text-[14px] font-medium">
                                5 menit
                            </span>
                        </div>
                        <Button
                            onClick={() => setStep(step + 1)}
                            className="bg-[#0f1115] hover:bg-black text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-md transition-all active:scale-95"
                        >
                            {step === 0 ? "Lanjut" : "Mulai"}
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // STEP 2: Dual Video Interface
    return (
        <div className="w-full min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
            <div className="w-full max-w-[1200px] h-full min-h-[700px] bg-white rounded-[2rem] shadow-[0_4px_30px_-6px_rgba(0,0,0,0.03)] border border-gray-50 flex flex-col relative overflow-hidden">
                {/* Top Bar */}
                <div className="w-full p-8 relative flex items-start justify-center">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setStep(1)}
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
                            Halo
                        </h1>
                    </div>
                </div>

                {/* Main Content (Videos) */}
                <div className="flex-1 flex flex-col md:flex-row gap-8 px-8 md:px-12 pb-12 mt-4 items-start justify-center w-full">
                    {/* Left Side: Reference Video */}
                    <div className="flex-1 flex flex-col items-center gap-6 w-full max-w-[500px]">
                        <div className="w-full aspect-4/3 bg-[#00FF00] rounded-[1.5rem] overflow-hidden shadow-md relative flex items-center justify-center"></div>

                        {/* Controls */}
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
                        </div>

                        <div className="flex flex-col items-center gap-3 w-full">
                            <div className="flex items-center gap-2">
                                <Lock className="w-[14px] h-[14px] text-blue-500" />
                                <span className="text-[13px] text-gray-600 font-semibold tracking-wide">
                                    Privasi Anda tetap terjaga
                                </span>
                            </div>

                            {/* Checklist */}
                            {cameraGranted && (
                                <div className="w-full max-w-[280px] bg-white rounded-2xl p-5 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col gap-3 animate-in fade-in slide-in-from-top-4">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
                                        <span className="text-[13.5px] font-medium text-gray-700">
                                            Kamera siap digunakan
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
                                        <span className="text-[13.5px] font-medium text-gray-700">
                                            Pencahayaan cukup
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <AlertCircle className="w-[16px] h-[16px] text-yellow-500" />
                                        <span className="text-[13.5px] font-medium text-gray-700">
                                            Tangan belum terdeteksi
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-[16px] h-[16px] text-green-500" />
                                        <span className="text-[13.5px] font-medium text-gray-700">
                                            Posisi sudah sesuai
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
