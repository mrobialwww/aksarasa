import Image from "next/image";
import Link from "next/link";
import { ArrowLeftRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function KontribusiView() {
    return (
        <div className="w-full min-h-full flex flex-col items-center p-8 md:p-12 xl:p-16 relative">
            <div className="w-full max-w-250 flex flex-col items-center gap-10 pb-20">
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

                {/* Grid 2x2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    {/* Module 1 */}
                    <div className="bg-[#fdfdfd] rounded-[2rem] p-6 flex flex-row gap-6 items-center justify-between shadow-[0_4px_20px_-6px_rgba(0,0,0,0.02)] border border-gray-50">
                        <div className="flex-1 flex flex-col items-start px-2">
                            <h3 className="text-[18px] font-bold text-gray-900 mb-10">Bagian 1</h3>
                            <Link
                                href="/kontribusi/list-words"
                                className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-md transition-all active:scale-95 inline-block"
                            >
                                Kontribusi
                            </Link>
                        </div>
                        <div className="w-45 sm:w-55 aspect-4/3 bg-[#eef7ff] rounded-3xl flex flex-col items-start justify-between p-5 relative overflow-hidden shrink-0">
                            <span className="font-bold text-gray-900 z-10 text-[17.5px] leading-tight">Menyapa</span>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32">
                                <Image src="/mascot_blue.svg" alt="Menyapa" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Module 2 */}
                    <div className="bg-[#fdfdfd] rounded-[2rem] p-6 flex flex-row gap-6 items-center justify-between shadow-[0_4px_20px_-6px_rgba(0,0,0,0.02)] border border-gray-50">
                        <div className="flex-1 flex flex-col items-start px-2">
                            <h3 className="text-[18px] font-bold text-gray-900 mb-10">Bagian 2</h3>
                            <Button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-md transition-all active:scale-95">
                                Kontribusi
                            </Button>
                        </div>
                        <div className="w-45 sm:w-55 aspect-4/3 bg-[#f5e8ff] rounded-3xl flex flex-col items-start justify-between p-5 relative overflow-hidden shrink-0">
                            <span className="font-bold text-gray-900 z-10 text-[17.5px] leading-tight max-w-30">Memperkenalkan Diri</span>
                            <div className="absolute -bottom-6 -right-2 w-32 h-32">
                                <Image src="/mascot_purple.svg" alt="Memperkenalkan Diri" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Module 3 */}
                    <div className="bg-[#fdfdfd] rounded-[2rem] p-6 flex flex-row gap-6 items-center justify-between shadow-[0_4px_20px_-6px_rgba(0,0,0,0.02)] border border-gray-50">
                        <div className="flex-1 flex flex-col items-start px-2">
                            <h3 className="text-[18px] font-bold text-gray-900 mb-10">Bagian 3</h3>
                            <Button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-md transition-all active:scale-95">
                                Kontribusi
                            </Button>
                        </div>
                        <div className="w-45 sm:w-55 aspect-4/3 bg-[#ffedd5] rounded-3xl flex flex-col items-start justify-between p-5 relative overflow-hidden shrink-0">
                            <span className="font-bold text-gray-900 z-10 text-[17.5px] leading-tight">Bertanya</span>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32">
                                <Image src="/mascot_orange.svg" alt="Bertanya" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Module 4 */}
                    <div className="bg-[#fdfdfd] rounded-[2rem] p-6 flex flex-row gap-6 items-center justify-between shadow-[0_4px_20px_-6px_rgba(0,0,0,0.02)] border border-gray-50">
                        <div className="flex-1 flex flex-col items-start px-2">
                            <h3 className="text-[18px] font-bold text-gray-900 mb-10">Bagian 4</h3>
                            <Button className="bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-bold text-[14px] shadow-md transition-all active:scale-95">
                                Kontribusi
                            </Button>
                        </div>
                        <div className="w-45 sm:w-55 aspect-4/3 bg-[#fef9c3] rounded-3xl flex flex-col items-start justify-between p-5 relative overflow-hidden shrink-0">
                            <span className="font-bold text-gray-900 z-10 text-[17.5px] leading-tight">Menjawab</span>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32">
                                {/* Fallback to standard mascot since yellow one isn't in public dir */}
                                <Image src="/mascot.svg" alt="Menjawab" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions (Fixed at bottom of scroll container) */}
            <div className="sticky bottom-4 w-full max-w-250 mx-auto flex justify-between px-4 md:px-0 pointer-events-none mt-auto">
                <Button
                    variant="outline"
                    className="flex items-center gap-2.5 px-6 py-3.5 bg-white rounded-full font-bold text-[14.5px] text-gray-700 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.08)] border border-gray-100 hover:bg-gray-50 hover:-translate-y-0.5 active:translate-y-0 transition-all pointer-events-auto"
                >
                    <ArrowLeftRight className="w-4.5 h-4.5" />
                    Ganti tangan
                </Button>
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
