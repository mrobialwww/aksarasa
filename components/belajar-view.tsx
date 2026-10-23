import { BookOpen, Map } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { PathCard } from "@/components/path-card";

export function PembelajaranView() {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100">
            <Navbar />

            <main className="flex flex-col items-center pt-48 pb-20 px-4">
                <div className="text-center mb-14">
                    <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-3 tracking-tight">Bagaimana kamu ingin mulai?</h1>
                    <p className="text-gray-500 text-[15px]">Pilih cara belajar yang paling sesuai untukmu.</p>
                </div>

                <div className="flex flex-col gap-6 w-full max-w-200 justify-center">
                    <PathCard
                        title="Mulai dengan Panduan"
                        description="Cocok untuk kamu yang baru pertama kali belajar BISINDO. Kami akan menjelaskan cara kerja setiap langkah pembelajaran sebelum mulai."
                        features={["Pengenalan cara belajar", "Panduan penggunaan kamera", "Tips membaca video referensi"]}
                        icon={BookOpen}
                        theme="blue"
                        href="/belajar/panduan"
                    />

                    <PathCard
                        title="Langsung Pilih Misi"
                        description="Untuk kamu yang sudah siap atau pernah mencoba sebelumnya. Pilih langsung unit pelajaran yang ingin dipelajari."
                        features={["Mulai belajar langsung", "Pilih sesuai levelmu", "Huruf, Angka, Kosakata, Kalimat"]}
                        icon={Map}
                        theme="green"
                        href="/belajar/misi"
                    />
                </div>
            </main>
        </div>
    );
}
