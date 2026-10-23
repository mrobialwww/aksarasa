import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { OnboardingForm } from "@/components/onboarding-form";

export default async function PanduanPage() {
    // Simulasi loading 3 detik
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return (
        <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100 relative">
            {/* Back Button */}
            <Link
                href="/belajar"
                className="absolute top-8 left-8 md:top-12 md:left-12 w-11 h-11 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors z-10"
            >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>

            <main className="flex flex-col items-center pt-24 md:pt-32 px-4 max-w-2xl mx-auto w-full min-h-screen">
                <OnboardingForm />
            </main>
        </div>
    );
}
