import Image from "next/image";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export function PembelajaranView() {
    return (
        <div className="w-full h-full p-8 md:p-12 xl:p-16">
            <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 max-w-250 mx-auto">
                {/* Left Column: Modules List */}
                <div className="flex-1 flex flex-col gap-6">
                    {/* Module 1 */}
                    <div className="bg-white rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.05)] border border-gray-50 items-center justify-between">
                        <div className="flex-1 flex flex-col items-start w-full px-2">
                            <h3 className="text-[20px] font-bold text-gray-900 mb-6">Bagian 1</h3>

                            <div className="flex items-center gap-4 w-full mb-6">
                                <Progress value={50} className="flex-1 h-3.5 bg-gray-100" />
                                <span className="text-sm font-bold text-gray-900">50%</span>
                            </div>

                            <Link
                                href="/pembelajaran/words-practice"
                                className="bg-gray-900 hover:bg-black text-white px-10 py-3.5 rounded-full font-bold text-[15px] w-full sm:w-auto shadow-md transition-all active:scale-95 inline-block text-center"
                            >
                                Lanjutkan
                            </Link>
                        </div>

                        <div className="w-full sm:w-60 aspect-4/3 bg-[#eef7ff] rounded-3xl flex flex-col items-start justify-between p-6 relative overflow-hidden shrink-0">
                            <span className="font-bold text-gray-900 z-10 text-[19px] leading-tight">Menyapa</span>
                            <div className="absolute -bottom-6 -right-6 w-40 h-40">
                                <Image src="/mascot_blue.svg" alt="Menyapa" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Module 2 */}
                    <div className="bg-white rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.03)] border border-gray-50 items-center justify-between">
                        <div className="flex-1 flex flex-col items-start w-full px-2">
                            <h3 className="text-[20px] font-bold text-gray-400 mb-6">Bagian 2</h3>

                            <div className="flex items-center gap-2 mb-6 text-gray-400">
                                <Lock className="w-4.5 h-4.5" />
                                <span className="text-[15px] font-bold">20 unit</span>
                            </div>

                            <Button className="bg-[#e5e5e5] text-gray-500 px-10 py-3.5 rounded-full font-bold text-[15px] w-full sm:w-auto cursor-not-allowed">
                                Mulai
                            </Button>
                        </div>

                        <div className="w-full sm:w-60 aspect-4/3 bg-[#f5e8ff] rounded-3xl flex flex-col items-start justify-between p-6 relative overflow-hidden shrink-0">
                            <span className="font-bold text-[#374151] z-10 text-[19px] leading-tight max-w-35">Memperkenalkan Diri</span>
                            <div className="absolute -bottom-8 -right-4 w-40 h-40">
                                <Image src="/mascot_purple.svg" alt="Memperkenalkan Diri" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Module 3 */}
                    <div className="bg-white rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.03)] border border-gray-50 items-center justify-between">
                        <div className="flex-1 flex flex-col items-start w-full px-2">
                            <h3 className="text-[20px] font-bold text-gray-400 mb-6">Bagian 3</h3>

                            <div className="flex items-center gap-2 mb-6 text-gray-400">
                                <Lock className="w-4.5 h-4.5" />
                                <span className="text-[15px] font-bold">20 unit</span>
                            </div>

                            <Button className="bg-[#e5e5e5] text-gray-500 px-10 py-3.5 rounded-full font-bold text-[15px] w-full sm:w-auto cursor-not-allowed">
                                Mulai
                            </Button>
                        </div>

                        <div className="w-full sm:w-60 aspect-4/3 bg-[#ffedd5] rounded-3xl flex flex-col items-start justify-between p-6 relative overflow-hidden shrink-0">
                            <span className="font-bold text-[#374151] z-10 text-[19px] leading-tight">Bertanya</span>
                            <div className="absolute -bottom-8 -right-4 w-40 h-40">
                                <Image src="/mascot_orange.svg" alt="Bertanya" fill className="object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Module 4 */}
                    <div className="bg-white rounded-[2rem] p-6 flex flex-col sm:flex-row gap-6 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.03)] border border-gray-50 items-center justify-between">
                        <div className="flex-1 flex flex-col items-start w-full px-2">
                            <h3 className="text-[20px] font-bold text-gray-400 mb-6">Bagian 4</h3>

                            <div className="flex items-center gap-2 mb-6 text-gray-400">
                                <Lock className="w-4.5 h-4.5" />
                                <span className="text-[15px] font-bold">20 unit</span>
                            </div>

                            <Button className="bg-[#e5e5e5] text-gray-500 px-10 py-3.5 rounded-full font-bold text-[15px] w-full sm:w-auto cursor-not-allowed">
                                Mulai
                            </Button>
                        </div>

                        <div className="w-full sm:w-60 aspect-4/3 bg-[#fef3c7] rounded-3xl flex flex-col items-start justify-between p-6 relative overflow-hidden shrink-0">
                            <span className="font-bold text-[#374151] z-10 text-[19px] leading-tight">Menjawab</span>
                            <div className="absolute -bottom-8 -right-4 w-40 h-40">
                                <Image src="/mascot_yellow.svg" alt="Menjawab" fill className="object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Profile Prompt */}
                <div className="w-full xl:w-[320px] shrink-0">
                    <div className="bg-white rounded-[1.8rem] p-7 shadow-[0_4px_30px_-6px_rgba(0,0,0,0.04)] border border-gray-50 flex flex-col gap-6 sticky top-0">
                        <p className="font-bold text-gray-900 text-[17px] leading-snug">Buat profil untuk menyimpan progresmu!</p>
                        <div className="flex flex-col gap-3.5">
                            <Button className="w-full py-4 bg-[#4a97f2] hover:bg-[#3d8ad9] text-white rounded-2xl font-bold text-[15px] shadow-[0_4px_0_0_#347bc4] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wide">
                                Buat Profil
                            </Button>
                            <Button className="w-full py-4 bg-[#69db96] hover:bg-[#5bc485] text-white rounded-2xl font-bold text-[15px] shadow-[0_4px_0_0_#46a66b] active:translate-y-1 active:shadow-none transition-all uppercase tracking-wide">
                                Sudah Punya Akun
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
