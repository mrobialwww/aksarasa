import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, Search, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ListWordsView() {
    const words = ["Halo", "Selamat pagi", "Selamat siang", "Selamat sore", "Selamat malam"];

    return (
        <div className="w-full min-h-full flex flex-col items-center p-8 md:p-12 xl:p-16 relative">
            <div className="w-full max-w-250 flex flex-col items-center gap-10 pb-24">
                {/* Top Banner */}
                <div className="w-full bg-[#f8f9fa] rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center border border-gray-50 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.03)]">
                    <div className="relative w-48 h-48 shrink-0">
                        <Image src="/mascot_blue.svg" alt="Mascot" fill className="object-contain" />
                    </div>
                    <div className="flex flex-col gap-3.5 text-[#374151] leading-relaxed">
                        <h2 className="text-[20px] font-bold text-gray-900 mb-1">Rekam Isyarat BISINDO</h2>
                        <p className="text-[14.5px]">
                            Bantu kami mengembangkan pembelajaran BISINDO yang lebih baik. Pilih salah satu kosakata di bawah ini, lalu rekam
                            isyaratnya menggunakan kamera.
                        </p>
                        <p className="text-[14.5px]">
                            Setiap rekaman yang lolos proses validasi akan menjadi bagian dari dataset terbuka AksaRasa untuk membantu meningkatkan
                            kualitas pembelajaran dan pengembangan teknologi bahasa isyarat Indonesia di masa depan.
                        </p>
                        <p className="text-[14.5px] font-bold underline underline-offset-4 mt-2">
                            Dengan melanjutkan, kamu menyetujui syarat dan ketentuan kontribusi yang berlaku.
                        </p>
                    </div>
                </div>

                {/* Words List */}
                <div className="flex flex-col gap-6 mt-4 w-full items-center">
                    {words.map((word) => (
                        <Link
                            key={word}
                            href={`/kontribusi/rekam?kata=${encodeURIComponent(word)}`}
                            className="text-[22px] md:text-[26px] font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 hover:scale-[1.35] cursor-pointer"
                        >
                            {word}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Bottom Actions (Fixed at bottom of scroll container) */}
            <div className="sticky bottom-4 w-full max-w-250 mx-auto flex justify-between items-center px-4 md:px-0 mt-auto z-10 pointer-events-none">
                <Button
                    variant="outline"
                    className="flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-full font-bold text-[14.5px] text-gray-700 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] border border-gray-100 hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0 transition-all pointer-events-auto"
                >
                    <ArrowLeftRight className="w-4.5 h-4.5" />
                    Ganti tangan
                </Button>

                <Link
                    href="/kontribusi"
                    className="flex items-center gap-2 px-6 py-3.5 bg-white rounded-full font-bold text-[15px] text-gray-800 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] border border-gray-100 hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0 transition-all pointer-events-auto absolute left-1/2 -translate-x-1/2"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Menyapa
                </Link>

                <Button
                    variant="outline"
                    className="flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-full font-bold text-[14.5px] text-gray-700 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] border border-gray-100 hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0 transition-all pointer-events-auto"
                >
                    <Search className="w-4.5 h-4.5" />
                    Cari kata
                </Button>
            </div>
        </div>
    );
}
