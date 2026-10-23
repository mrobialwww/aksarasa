"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { getHistoryItems, type HistoryItem } from "@/data/history";

interface AiFeedbackHistoryProps {
    searchQuery?: string;
    onSelectItem?: (item: HistoryItem) => void;
}

export function AiFeedbackHistory({ searchQuery = "", onSelectItem }: AiFeedbackHistoryProps) {
    const filteredItems = getHistoryItems(searchQuery);

    return (
        <div className="flex w-full flex-1 flex-col gap-8 animate-in fade-in duration-200">
            <h2 className="text-2xl font-semibold leading-7 text-[#424242]">Riwayat</h2>

            <div className="flex flex-col gap-3">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <Link
                            key={item.id}
                            href={`/detailRiwayat?id=${item.id}`}
                            onClick={() => {
                                onSelectItem?.(item);
                            }}
                            className={`flex w-full items-center justify-between rounded-[24px] border-2 ${
                                item.isCorrect
                                    ? "border-[#F5F5F5] bg-white hover:border-[#E0E0E0] hover:bg-[#FAFAFA]"
                                    : "border-[#FEF0F0] bg-[#FFFBFB] hover:border-[#FDE0E0] hover:bg-[#FFF5F5]"
                            } px-7 py-5 text-left transition-all hover:shadow-xs active:scale-[0.99]`}
                        >
                            <div className="flex items-center gap-2.5">
                                {item.isCorrect ? (
                                    <CheckCircle2 className="size-5 shrink-0 fill-[#1E1E1E] text-white" />
                                ) : (
                                    <XCircle className="size-5 shrink-0 fill-[#E85C52] text-white" />
                                )}
                                <span className="text-xl font-medium leading-6 text-[#424242]">{item.title}</span>
                            </div>
                            <span className="text-base font-medium leading-6 text-[#757575]">{item.date}</span>
                        </Link>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-[24px] border-2 border-dashed border-[#F0F0F0] py-12 text-center text-[#757575]">
                        <p className="text-base font-medium">Tidak ada riwayat untuk &ldquo;{searchQuery}&rdquo;</p>
                    </div>
                )}
            </div>
        </div>
    );
}
