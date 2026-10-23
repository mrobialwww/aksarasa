"use client";

import Image from "next/image";
import { Search, ArrowLeft } from "lucide-react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { AiFeedbackActions } from "@/components/ai-feedback-actions";
import { AiFeedbackHistory } from "@/components/ai-feedback-history";

export function AiFeedbackView() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<string | null>(null);

    const [isHovered, setIsHovered] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef<HTMLInputElement>(null);

    const isExpanded = isHovered || isSearchActive;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadedFile(file.name);
        }
    };

    const handleExitSearch = () => {
        setIsSearchActive(false);
        setSearchQuery("");
        setIsHovered(false);
        searchInputRef.current?.blur();
    };

    return (
        <div className="min-h-screen w-full bg-[#FAFAFA] p-4 md:p-6 lg:p-8">
            <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-319.5 flex-col gap-8 rounded-[40px] bg-white px-6 py-8 md:px-12 md:py-8 lg:px-24 xl:px-39.75">
                {/* Floating Search History Button with Hover-Expand Animation */}
                <div className="flex w-full items-center justify-between">
                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => {
                            setIsSearchActive(true);
                            searchInputRef.current?.focus();
                        }}
                        className={cn(
                            "group flex h-18 items-center rounded-full border-2 border-[#E0E0E0] bg-white shadow-sm transition-all duration-300 ease-out cursor-pointer",
                            isExpanded
                                ? "w-full max-w-95 px-4 gap-6 shadow-md justify-start"
                                : "w-18 justify-center p-0 gap-0 hover:bg-[#FAFAFA] hover:shadow-md active:scale-95",
                        )}
                        aria-expanded={isExpanded}
                    >
                        <div
                            className="flex size-10 shrink-0 items-center justify-center text-[#424242] transition-colors group-hover:text-[#0069E0]"
                            aria-label="Cari riwayat AI Feedback"
                        >
                            <Search className="size-10" strokeWidth={1.8} />
                        </div>

                        <div
                            className={cn(
                                "items-center overflow-hidden transition-all duration-300 ease-out whitespace-nowrap",
                                isExpanded
                                    ? "flex flex-1 w-61 opacity-100 pr-2"
                                    : "w-0 max-w-0 flex-none opacity-0 pointer-events-none m-0 p-0",
                            )}
                        >
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Cari Riwayat AI Feedback"
                                className="w-full bg-transparent text-xl font-semibold leading-6 text-[#424242] placeholder:text-[#424242] focus:outline-none"
                            />
                        </div>
                    </div>

                    {isSearchActive && (
                        <button
                            type="button"
                            onClick={handleExitSearch}
                            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#757575] transition-colors hover:bg-[#F5F5F5] hover:text-[#424242]"
                        >
                            <ArrowLeft className="size-4" strokeWidth={2} />
                            <span>Kembali</span>
                        </button>
                    )}
                </div>

                {/* Main Dynamic Content Area */}
                {isSearchActive ? (
                    <AiFeedbackHistory searchQuery={searchQuery} />
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center gap-8 py-4">
                        {/* Mascot and Greeting Title */}
                        <div className="flex flex-col items-center justify-center gap-5 text-center md:flex-row">
                            <Image
                                src="/robot.svg"
                                alt="Robot AksaRasa"
                                width={200}
                                height={200}
                                className="size-50 shrink-0 object-contain drop-shadow-sm"
                                priority
                            />
                            <h1 className="text-center text-2xl font-medium leading-tight text-[#424242] md:text-[32px] md:leading-6">
                                Aku siap memberi Feedback !
                            </h1>
                        </div>

                        {/* Action Cards Component */}
                        <AiFeedbackActions fileInputRef={fileInputRef} uploadedFile={uploadedFile} />
                    </div>
                )}
            </section>

            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileChange} className="hidden" aria-label="Pilih video" />
        </div>
    );
}
