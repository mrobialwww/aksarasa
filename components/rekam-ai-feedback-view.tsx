"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, LockKeyhole, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CameraStatus = {
    cameraReady: boolean;
    lightingBright: boolean;
    handDetected: boolean;
};

export function RekamAiFeedbackView() {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [cameraStatus, setCameraStatus] = useState<CameraStatus>({
        cameraReady: false,
        lightingBright: false,
        handDetected: false,
    });
    const [cameraError, setCameraError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
                    audio: false,
                });

                if (!active) {
                    stream.getTracks().forEach((t) => t.stop());
                    return;
                }

                streamRef.current = stream;

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    await videoRef.current.play();
                }

                // Simulate status checks with a short delay
                setTimeout(() => {
                    if (active)
                        setCameraStatus({
                            cameraReady: true,
                            lightingBright: true,
                            handDetected: true,
                        });
                }, 800);
            } catch {
                if (active) setCameraError("Izin kamera ditolak atau tidak tersedia.");
            }
        }

        startCamera();

        return () => {
            active = false;
            streamRef.current?.getTracks().forEach((t) => t.stop());
        };
    }, []);

    const allReady = cameraStatus.cameraReady && cameraStatus.lightingBright && cameraStatus.handDetected;

    const statusBadges = [
        { key: "cameraReady", label: "Kamera Siap", ready: cameraStatus.cameraReady },
        { key: "lightingBright", label: "Pencahayaan Terang", ready: cameraStatus.lightingBright },
        { key: "handDetected", label: "Tangan Terdeteksi", ready: cameraStatus.handDetected },
    ];

    return (
        <div className="min-h-screen w-full bg-[#FAFAFA] p-8">
            <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1596px] flex-col items-center justify-center gap-10 rounded-[40px] bg-white px-40 py-8">
                {/* Back Button - absolute top-left */}
                <div className="absolute left-17.25 top-8">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex size-18 items-center justify-center rounded-full border-[3px] border-[#E0E0E0] bg-white shadow-sm transition-all duration-200 hover:bg-[#F5F5F5] hover:shadow-md active:scale-95"
                        aria-label="Kembali"
                    >
                        <ChevronLeft className="size-10 text-[#0A0D12]" strokeWidth={2} />
                    </button>
                </div>

                {/* Center Column */}
                <div className="flex flex-col items-center gap-12">
                    {/* Camera Preview + Status */}
                    <div className="flex flex-col items-center gap-4">
                        {/* Camera Preview Box */}
                        <div className="relative h-120 w-160 overflow-hidden rounded-[32px] bg-[#1a1a2e]">
                            {cameraError ? (
                                <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                                    <LockKeyhole className="size-10 text-[#757575]" strokeWidth={1.5} />
                                    <p className="text-sm font-medium text-[#757575]">{cameraError}</p>
                                </div>
                            ) : (
                                <>
                                    <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
                                    {/* Dashed guide overlay */}
                                    <div
                                        className="pointer-events-none absolute rounded-[32px]"
                                        style={{
                                            left: "230px",
                                            top: "82px",
                                            width: "179px",
                                            height: "230px",
                                            border: "12px dashed rgba(255,255,255,0.5)",
                                            borderRadius: "32px",
                                        }}
                                    />
                                </>
                            )}
                        </div>

                        {/* Privacy Notice + Status Badges */}
                        <div className="flex flex-col items-center gap-4">
                            {/* Privacy Line */}
                            <div className="flex items-center gap-2.5">
                                <LockKeyhole className="size-6 text-blue-500" strokeWidth={1.8} />
                                <span className="text-xl font-medium leading-6 text-[#424242]">Privasi Anda tetap terjaga</span>
                            </div>

                            {/* Status Badges Row */}
                            <div className="flex items-center gap-4">
                                {statusBadges.map(({ key, label, ready }) => (
                                    <div
                                        key={key}
                                        className={cn(
                                            "flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-500",
                                            ready ? "border-[#71D8A0] bg-[#DBF5E7]" : "border-[#E0E0E0] bg-[#F5F5F5]",
                                        )}
                                    >
                                        <Check
                                            className={cn("size-3.5 transition-colors duration-500", ready ? "text-[#3EA56D]" : "text-[#9E9E9E]")}
                                            strokeWidth={2.5}
                                        />
                                        <span
                                            className={cn(
                                                "text-xs font-semibold leading-3.5 transition-colors duration-500",
                                                ready ? "text-[#3EA56D]" : "text-[#9E9E9E]",
                                            )}
                                        >
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="rounded-full border border-[#EEEEEE] bg-[#F5F5F5] px-16 py-3 text-lg font-semibold leading-6 text-[#0A0D12] transition-all duration-200 hover:bg-[#EEEEEE] active:scale-95"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            disabled={!allReady}
                            className={cn(
                                "rounded-full px-16 py-3 text-lg font-semibold leading-6 text-[#FAFAFA] transition-all duration-200 active:scale-95",
                                allReady ? "bg-[#0A0D12] hover:bg-[#1a1f2e] hover:shadow-lg" : "cursor-not-allowed bg-[#424242] opacity-50",
                            )}
                        >
                            Mulai Rekam
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
