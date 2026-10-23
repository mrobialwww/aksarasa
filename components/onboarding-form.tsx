"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const steps = [
    {
        id: 1,
        question: "Apa tujuanmu belajar BISINDO?",
        showMascot: true,
        options: [
            "Berkomunikasi sehari-hari",
            "Mengenal teman tuli lebih baik",
            "Belajar untuk pendidikan",
            "Mendukung pekerjaan",
            "Sekadar ingin belajar",
        ],
    },
    {
        id: 2,
        question: "Seberapa jauh kamu tahu tentang BISINDO?",
        showMascot: true,
        options: [
            "Baru pertama kali",
            "Pernah belajar",
            "Sudah memahami dasar",
            "Sudah cukup terbiasa",
        ],
    },
];

export function OnboardingForm() {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});

    const currentStep = steps[currentStepIndex];
    const selectedOption = answers[currentStep.id];

    const router = useRouter();

    const handleNext = () => {
        if (currentStepIndex < steps.length - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
        } else {
            router.push("/belajar/kuis");
        }
    };

    const handleSelectOption = (option: string) => {
        setAnswers((prev) => ({
            ...prev,
            [currentStep.id]: option,
        }));
    };

    return (
        <div className="w-full flex flex-col items-center max-w-[460px]">
            {/* Mascot & Chat Bubble */}
            <div className={`flex items-end gap-3 mb-8 w-full ${currentStep.showMascot ? "md:-ml-28" : "md:-ml-32"}`}>
                {currentStep.showMascot && (
                    <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0 mb-1">
                        <Image 
                            src="/mascot.svg" 
                            alt="Mascot AksaRasa" 
                            fill 
                            className="object-contain drop-shadow-sm"
                        />
                    </div>
                )}
                <div className={`bg-white px-6 py-3.5 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] ${
                    currentStep.showMascot ? "rounded-[1.5rem] rounded-bl-md" : "rounded-full"
                }`}>
                    <p className="text-gray-900 font-medium text-[14px]">
                        {currentStep.question}
                    </p>
                </div>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-4 w-full items-center">
                {currentStep.options.map((option) => {
                    const isSelected = selectedOption === option;
                    return (
                        <Button
                            variant="outline"
                            key={option}
                            onClick={() => handleSelectOption(option)}
                            className={`w-full max-w-[340px] px-6 py-6 rounded-full text-[14px] font-medium transition-all duration-200 border text-center ${
                                isSelected 
                                    ? "border-[#85c6f9] bg-[#eff8ff] text-[#0284c7] shadow-[0_0_0_1px_#85c6f9]" 
                                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)]"
                            }`}
                        >
                            {option}
                        </Button>
                    );
                })}
            </div>

            {/* Bottom Right Floating Button */}
            <div className="fixed bottom-10 right-8 md:bottom-16 md:right-16 z-20">
                <Button
                    disabled={!selectedOption}
                    onClick={handleNext}
                    className={`px-8 py-6 rounded-full font-semibold text-[14px] transition-all ${
                        selectedOption 
                            ? "bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0" 
                            : "bg-[#9ca3af] text-white cursor-not-allowed hover:bg-[#9ca3af]"
                    }`}
                >
                    Lanjut
                </Button>
            </div>
        </div>
    );
}
