"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { PanelLeftOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <>
            <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

            {/* Floating button to reopen sidebar when closed */}
            {!isOpen && (
                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    aria-label="Buka sidebar"
                    className="fixed left-6 top-8 z-40 flex size-12 items-center justify-center rounded-full border-2 border-[#E0E0E0] bg-white text-[#424242] shadow-sm transition-all duration-200 hover:bg-[#F5F5F5] hover:text-[#0069E0] hover:shadow-md active:scale-95"
                >
                    <PanelLeftOpen className="size-6" strokeWidth={1.8} />
                </button>
            )}

            <main className={cn("min-h-screen transition-all duration-300 ease-in-out", isOpen ? "md:pl-65" : "pl-0")}>{children}</main>
        </>
    );
}
