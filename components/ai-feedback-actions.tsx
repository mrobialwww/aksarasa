"use client";

import Link from "next/link";
import { Camera, CloudUpload } from "lucide-react";
import { RefObject } from "react";

interface AiFeedbackActionsProps {
    fileInputRef: RefObject<HTMLInputElement | null>;
    uploadedFile: string | null;
}

export function AiFeedbackActions({ fileInputRef, uploadedFile }: AiFeedbackActionsProps) {
    return (
        <div className="flex w-full flex-col items-stretch gap-6 md:flex-row">
            {/* Record via Camera */}
            <Link
                href="/rekamAIFeedback"
                className="group flex flex-1 flex-col items-center justify-center gap-2.5 rounded-[32px] border-2 border-dashed border-[#99C3F3] bg-[#E6F0FC] px-8 py-12 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#66A5EC] hover:bg-[#D9EAFE] hover:shadow-md lg:px-16"
            >
                <Camera className="size-16 text-[#0A0D12] transition-transform duration-200 group-hover:scale-105" strokeWidth={1.5} />
                <span className="text-xl font-medium leading-6 text-[#0A0D12]">Rekam Langsung via Kamera</span>
            </Link>

            {/* Upload Video */}
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="group flex flex-1 flex-col items-center justify-center gap-2.5 rounded-[32px] border-2 border-dashed border-[#EEEEEE] bg-[#FAFAFA] px-8 py-12 text-center transition-all duration-200 hover:-translate-y-1 hover:border-[#D1D5DB] hover:bg-gray-100/60 hover:shadow-md lg:px-16"
            >
                <CloudUpload className="size-16 text-[#424242] transition-transform duration-200 group-hover:scale-105" strokeWidth={1.5} />
                <span className="text-xl font-medium leading-6 text-[#424242]">
                    {uploadedFile ? `Video: ${uploadedFile}` : "Masukkan video yang ingin dijelaskan"}
                </span>
            </button>
        </div>
    );
}
