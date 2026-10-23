import { Hand, Database } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { ActionCard } from "@/components/action-card";

export function HomeView() {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100">
            <Navbar />

            <main className="flex flex-col items-center pt-48 pb-20 px-4">
                <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-14 tracking-tight">Apa yang ingin Anda lakukan?</h1>

                <div className="flex w-full flex-col items-center justify-center gap-12 md:flex-row">
                    <ActionCard
                        title="Belajar BISINDO"
                        description="Pelajari bahasa isyarat Indonesia melalui video referensi dan latihan kamera interaktif dengan umpan balik AI."
                        features={["Huruf, angka, dan kosakata", "Panduan video langkah demi langkah", "Praktik kamera dengan umpan balik"]}
                        buttonText="Mulai Belajar"
                        icon={Hand}
                        theme="blue"
                        href="/belajar"
                    />

                    <ActionCard
                        title="Kontribusi Dataset"
                        description="Bantu kembangkan kecerdasan buatan BISINDO dengan menyumbangkan video gerakan isyaratmu untuk dataset komunitas."
                        features={["Upload atau rekam video gerakan", "Direview oleh ahli BISINDO", "Membantu semua pengguna AksaRasa"]}
                        buttonText="Mulai Berkontribusi"
                        icon={Database}
                        theme="purple"
                    />
                </div>
            </main>
        </div>
    );
}
