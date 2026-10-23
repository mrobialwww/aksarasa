"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, BrainCircuit, Database, LibraryBig, PanelLeftClose } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navigation = [
    {
        label: "AI Feedback",
        href: "/",
        icon: BrainCircuit,
        isActive: (pathname: string) => pathname === "/" || pathname.startsWith("/rekamAIFeedback") || pathname.startsWith("/detailRiwayat"),
    },
    {
        label: "Pembelajaran",
        href: "/pembelajaran",
        icon: BookOpen,
        isActive: (pathname: string) => pathname === "/pembelajaran" || pathname.startsWith("/pembelajaran/") || pathname.startsWith("/belajar"),
    },
    {
        label: "Kontribusi",
        href: "/kontribusi",
        icon: Database,
        isActive: (pathname: string) => pathname === "/kontribusi" || pathname.startsWith("/kontribusi/"),
    },
    {
        label: "Kamus",
        href: "/kamus",
        icon: LibraryBig,
        isActive: (pathname: string) => pathname === "/kamus" || pathname.startsWith("/kamus/"),
    },
];

interface SidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export function Sidebar({ isOpen = true, onClose = () => {} }: SidebarProps) {
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "fixed inset-y-0 left-0 z-50 hidden w-65 flex-col gap-10 bg-white px-4 py-8 md:flex",
                "transition-transform duration-300 ease-in-out",
                isOpen ? "translate-x-0" : "-translate-x-full",
            )}
        >
            <div className="flex items-center justify-between gap-8 px-2">
                <Link href="/" className="flex items-center gap-4" aria-label="AksaRasa beranda">
                    <Image src="/Logo black.svg" alt="AksaRasa" width={32} height={29} className="h-7.25 w-8 object-contain" priority />
                    <span className="text-base font-bold leading-5 text-[#424242]">AksaRasa</span>
                </Link>
                <button
                    type="button"
                    aria-label="Tutup sidebar"
                    onClick={onClose}
                    className="flex size-6 items-center justify-center text-[#424242] transition-colors hover:text-[#0069E0]"
                >
                    <PanelLeftClose className="size-6" strokeWidth={1.8} />
                </button>
            </div>
            <nav className="flex flex-col gap-4" aria-label="Navigasi utama">
                {navigation.map(({ label, href, icon: Icon, isActive }) => {
                    const active = isActive(pathname);
                    return (
                        <Link
                            key={label}
                            href={href}
                            className={cn(
                                "flex h-14 items-center gap-4 rounded-full border-2 px-6 py-4 text-lg font-semibold leading-6 transition-all duration-200",
                                active
                                    ? "border-[#66A5EC] bg-[#E6F0FC] text-[#0069E0]"
                                    : "border-transparent text-[#757575] hover:bg-[#F5F5F5] hover:text-[#424242]",
                            )}
                        >
                            <Icon className="size-6 shrink-0" strokeWidth={1.8} />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
