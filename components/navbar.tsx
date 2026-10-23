"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-6 md:top-8 left-0 right-0 z-50 px-4 md:px-8 flex justify-center w-full">
            <nav className="w-full max-w-319.5 bg-white/80 backdrop-blur-md rounded-full border border-black/5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] px-6 md:px-7 py-4 flex items-center justify-between transition-all">
                {/* Logo */}
                <Link href="/" className="flex items-center shrink-0">
                    <Image src="/Logo black.svg" alt="AksaRasa Logo" width={120} height={32} className="w-auto h-6 md:h-7 object-contain" priority />
                </Link>

                {/* Desktop Navigation Links - Centered */}
                <div className="hidden md:flex flex-1 items-center justify-center gap-8 lg:gap-10 text-[16px] font-medium tracking-tight">
                    <Link
                        href="/"
                        className="text-gray-900 font-semibold hover:text-gray-900 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gray-900 after:rounded-full"
                    >
                        Beranda
                    </Link>
                    <Link href="/praktik" className="text-gray-500 hover:text-gray-900 transition-colors py-1">
                        Praktik
                    </Link>
                    <Link href="/kamus" className="text-gray-500 hover:text-gray-900 transition-colors py-1">
                        Kamus
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100/60 rounded-full w-9 h-9"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Navigation Menu"
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
            </nav>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="absolute top-[calc(100%+12px)] left-4 right-4 bg-white/95 backdrop-blur-xl border border-black/5 rounded-3xl p-3 flex flex-col gap-1 shadow-xl md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                        href="/"
                        className="px-5 py-3 text-[15px] text-gray-900 font-semibold bg-gray-100/80 rounded-2xl"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Beranda
                    </Link>
                    <Link
                        href="/praktik"
                        className="px-5 py-3 text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-2xl transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Praktik
                    </Link>
                    <Link
                        href="/kamus"
                        className="px-5 py-3 text-[15px] text-gray-600 hover:text-gray-900 hover:bg-gray-50 font-medium rounded-2xl transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Kamus
                    </Link>
                </div>
            )}
        </header>
    );
}
