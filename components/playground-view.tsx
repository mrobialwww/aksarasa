"use client";

import { useState, useEffect, useRef } from "react";
import { BisindoOverlay } from "@/components/hand-tracking/bisindo-overlay";

import {
    ChevronLeft,
    Lock,
    CheckCircle2,
    AlertCircle,
    Search,
    SlidersHorizontal,
    Trash2,
    Info,
    ChevronRight,
    X,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function PlaygroundView() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showStatus, setShowStatus] = useState(true);
    const [cameraGranted, setCameraGranted] = useState(false);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);

    const handleAddWord = (word: string) => {
        setSelectedWords((prev) => [...prev, word]);
    };

    const handleRemoveWord = (indexToRemove: number) => {
        setSelectedWords((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleClearAll = () => {
        setSelectedWords([]);
    };

    useEffect(() => {
        // Switch view after 5 seconds
        const timer = setTimeout(() => {
            setShowStatus(false);
        }, 5000);

        // Start camera
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
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
            clearTimeout(timer);
            // Cleanup camera stream on unmount
            if (videoRef.current?.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    return (
        <div className="w-full min-h-full flex flex-col relative bg-[#fafafa]">
            {/* Back Button */}
            <div className="absolute top-4 left-4 md:top-10 md:left-10 z-20">
                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 md:w-11 md:h-11 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                    asChild
                >
                    <Link href="/belajar/pembelajaran">
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </Link>
                </Button>
            </div>

            <div className="flex-1 flex flex-col items-center pt-0 pb-20 px-4 w-full max-w-[900px] mx-auto">
                {/* Camera Container */}
                <div
                    className={`relative w-full max-w-[260px] md:max-w-[400px] aspect-4/3 rounded-[2rem] overflow-hidden shadow-md mb-4 transition-colors duration-500 ${cameraGranted ? "bg-black" : "bg-[#3f3f46]"}`}
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover -scale-x-100 ${cameraGranted ? "block" : "hidden"}`}
                    />

                    {/* Face Bracket Overlay */}
                    {cameraGranted && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[160px] md:w-[160px] md:h-[200px] pointer-events-none opacity-60">
                            {/* Top Left */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-2xl" />
                            {/* Top Right */}
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-2xl" />
                            {/* Bottom Left */}
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-2xl" />
                            {/* Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-2xl" />
                        </div>
                    )}

                    {/* BISINDO AI Overlay — ROI box + prediction badge */}
                    {cameraGranted && <BisindoOverlay videoRef={videoRef} />}
                </div>

                {/* Privacy Badge */}
                {!cameraGranted && (
                    <div className="flex items-center gap-2 mb-8">
                        <Lock className="w-[14px] h-[14px] text-blue-500" />
                        <span className="text-[13px] text-gray-600 font-medium tracking-wide">
                            Privasi Anda tetap terjaga
                        </span>
                    </div>
                )}

                {/* Bottom Section (Status vs Dictionary) */}
                <div className="w-full">
                    {showStatus && cameraGranted ? (
                        /* Status View (First 5 seconds) */
                        <div className="max-w-[320px] w-full mx-auto bg-white rounded-2xl p-5 md:p-6 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.05)] border border-gray-50 flex flex-col gap-3.5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-[18px] h-[18px] text-green-500" />
                                <span className="text-[14px] font-medium text-gray-700">
                                    Kamera siap digunakan
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-[18px] h-[18px] text-green-500" />
                                <span className="text-[14px] font-medium text-gray-700">
                                    Pencahayaan cukup
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-[18px] h-[18px] text-yellow-500" />
                                <span className="text-[14px] font-medium text-gray-700">
                                    Mendeteksi tangan…
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-[18px] h-[18px] text-green-500" />
                                <span className="text-[14px] font-medium text-gray-700">
                                    Posisi sudah sesuai
                                </span>
                            </div>
                        </div>
                    ) : (
                        /* Dictionary / Sentence Builder View */
                        <div className="w-full bg-white rounded-2xl md:rounded-[2rem] p-5 md:p-8 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col gap-5 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h3 className="text-[15px] md:text-[17px] font-bold text-gray-900">
                                    Pilih kata atau rangkai kalimat
                                </h3>
                                <Button variant="outline" size="sm" className="rounded-full h-8 px-3 text-[12px] md:text-[13px] font-medium text-gray-500 hover:text-gray-700">
                                    <Info className="w-4 h-4 mr-1.5" />
                                    Cara pakai
                                </Button>
                            </div>

                            {/* Search Bar */}
                            <div className="flex items-center gap-3">
                                <div className="relative flex-1">
                                    <Search className="w-[18px] h-[18px] text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                    <Input
                                        type="text"
                                        placeholder="Cari kata dalam BISINDO..."
                                        className="w-full h-12 pl-11 pr-4 rounded-xl bg-gray-50 border-gray-100 text-[14.5px] focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-blue-50 transition-all"
                                    />
                                </div>
                                <Button variant="outline" size="icon" className="w-12 h-12 rounded-xl text-gray-500 shrink-0">
                                    <SlidersHorizontal className="w-[18px] h-[18px]" />
                                </Button>
                            </div>

                            {/* Popular Words & Letters */}
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2.5">
                                    <span className="text-[13px] font-semibold text-gray-800">
                                        Kata populer
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {[
                                            "Halo",
                                            "Terima kasih",
                                            "Belajar",
                                            "Makan",
                                            "Minum",
                                        ].map((word) => (
                                            <Badge
                                                key={word}
                                                variant="outline"
                                                onClick={() => handleAddWord(word)}
                                                className="px-4 py-2 rounded-full text-[14px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer active:scale-95 transition-transform"
                                            >
                                                {word}
                                            </Badge>
                                        ))}
                                        <Button variant="outline" size="icon" className="w-9 h-9 rounded-full text-gray-400 hover:text-gray-600">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2.5">
                                    <span className="text-[13px] font-semibold text-gray-800">
                                        Huruf populer
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {["A", "B", "C", "D", "E"].map((letter) => (
                                            <Badge
                                                key={letter}
                                                variant="outline"
                                                onClick={() => handleAddWord(letter)}
                                                className="px-4 py-2 rounded-full text-[14px] font-medium text-gray-700 hover:bg-gray-50 cursor-pointer active:scale-95 transition-transform"
                                            >
                                                {letter}
                                            </Badge>
                                        ))}
                                        <Button variant="outline" size="icon" className="w-9 h-9 rounded-full text-gray-400 hover:text-gray-600">
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-gray-100" />

                            {/* Selected Words */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-[13px] font-semibold text-gray-800">
                                        Kata yang dipilih ({selectedWords.length})
                                    </span>
                                    {selectedWords.length > 0 && (
                                        <Button 
                                            variant="ghost" 
                                            size="sm" 
                                            onClick={handleClearAll}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50 text-[13px] font-medium"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1.5" />
                                            Hapus semua
                                        </Button>
                                    )}
                                </div>

                                {/* Pills & Dropzone */}
                                <div className="min-h-[80px] w-full bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between relative overflow-hidden">
                                    <div className="flex flex-wrap items-center gap-2 z-10 w-full md:w-auto justify-center md:justify-start">
                                        {/* Selected word pills */}
                                        {selectedWords.map((word, index) => (
                                            <Badge 
                                                key={`${word}-${index}`} 
                                                variant="outline" 
                                                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white shadow-sm text-[13px] md:text-[14px] font-medium text-gray-700"
                                            >
                                                {word}
                                                <X 
                                                    className="w-3.5 h-3.5 cursor-pointer text-gray-400 hover:text-gray-600" 
                                                    onClick={() => handleRemoveWord(index)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                    
                                    {selectedWords.length === 0 && (
                                        <span className="text-[12px] md:text-[13px] text-gray-400 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] text-center pointer-events-none md:static md:translate-x-0 md:translate-y-0 md:text-right md:w-auto flex-1">
                                            Tambahkan kata dari atas merakit atau untuk merangkai kalimat
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
