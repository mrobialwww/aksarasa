import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { QuizForm } from "@/components/quiz-form";

export default function KuisPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-blue-100 relative">
            {/* Back Button */}
            <Link 
                href="/belajar/panduan" 
                className="absolute top-8 left-8 md:top-12 md:left-12 w-11 h-11 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:bg-gray-50 transition-colors z-10"
            >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
            </Link>

            <main className="flex flex-col items-center justify-center min-h-screen px-4 w-full pt-16 pb-24">
                <QuizForm />
            </main>
        </div>
    );
}
