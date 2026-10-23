"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const questions = [
    {
        id: 1,
        text: "Menurutmu gestur ini berarti...",
        image: "/gesture.png",
        options: ["Halo", "Terima kasih", "Saya", "Selamat pagi"],
        correctAnswer: "Halo",
    },
    {
        id: 2,
        text: "Menurutmu gestur ini berarti...",
        image: "/gesture.png",
        options: ["Halo", "Terima kasih", "Saya", "Selamat pagi"],
        correctAnswer: "Halo",
    },
    {
        id: 3,
        text: "Menurutmu gestur ini berarti...",
        image: "/gesture.png",
        options: ["Halo", "Terima kasih", "Saya", "Selamat pagi"],
        correctAnswer: "Halo",
    },
];

export function QuizForm() {
    const router = useRouter();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isChecked, setIsChecked] = useState(false);

    const question = questions[currentQuestionIndex];
    // Progress calculation for 3 steps (33%, 66%, 100%)
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    const handleCheckOrNext = () => {
        if (!isChecked) {
            setIsChecked(true);
        } else {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
                setIsChecked(false);
            } else {
                router.push("/belajar/pembelajaran"); // Finish kuis flow
            }
        }
    };

    return (
        <div className="w-full flex flex-col items-center max-w-4xl">
            {/* Header & Progress */}
            <div className="w-full flex flex-col items-center mb-8">
                <h2 className="text-[15px] md:text-[17px] font-medium text-gray-900 mb-5">
                    Yuk, mulai dari yang sederhana!
                </h2>
                <Progress value={progress} className="w-full h-3 max-w-[400px] bg-gray-200" />
            </div>

            {/* Question Text Box */}
            <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] rounded-[1.2rem] px-6 py-4 mb-5">
                <p className="text-[14px] md:text-[15px] text-gray-700">
                    {question.text}
                </p>
            </div>

            {/* Image Box */}
            <div className="relative w-full max-w-2xl aspect-video md:aspect-2/1 lg:aspect-21/9 rounded-[1.5rem] overflow-hidden mb-8 bg-gray-100">
                <Image
                    src={question.image}
                    alt="Gesture"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                {question.options.map((option) => {
                    let btnClass =
                        "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.02)]"; // default

                    if (isChecked) {
                        if (
                            option === question.correctAnswer &&
                            selectedOption === option
                        ) {
                            // Selected and Correct
                            btnClass =
                                "border-green-400 bg-[#e8fcf0] text-green-800";
                        } else if (
                            option !== question.correctAnswer &&
                            selectedOption === option
                        ) {
                            // Selected and Incorrect
                            btnClass = "border-red-400 bg-red-50 text-red-700";
                        } else {
                            // Not selected (disabled look)
                            btnClass = "border-gray-100 bg-white text-gray-400";
                        }
                    } else if (selectedOption === option) {
                        // Selected but not checked yet
                        btnClass =
                            "border-[#85c6f9] bg-[#eff8ff] text-[#0284c7] shadow-[0_0_0_1px_#85c6f9]";
                    }

                    return (
                        <Button
                            variant="outline"
                            key={option}
                            onClick={() => {
                                if (
                                    isChecked &&
                                    selectedOption === question.correctAnswer
                                )
                                    return; // Prevent changing if correct
                                setSelectedOption(option);
                                setIsChecked(false);
                            }}
                            disabled={
                                isChecked &&
                                selectedOption === question.correctAnswer
                            }
                            className={`w-full px-5 py-6 rounded-full text-lg font-medium transition-all duration-200 border text-left ${btnClass}`}
                        >
                            {option}
                        </Button>
                    );
                })}
            </div>

            {/* Bottom Right Floating Button */}
            <div className="fixed bottom-10 right-8 md:bottom-16 md:right-16 z-20">
                <Button
                    disabled={!selectedOption || (isChecked && selectedOption !== question.correctAnswer)}
                    onClick={handleCheckOrNext}
                    className={`px-8 py-6 rounded-full font-semibold text-sm transition-all ${
                        selectedOption && (!isChecked || selectedOption === question.correctAnswer)
                            ? "bg-gray-900 text-white hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            : "bg-[#9ca3af] text-white cursor-not-allowed hover:bg-[#9ca3af]"
                    }`}
                >
                    {(isChecked && selectedOption === question.correctAnswer) ? "Lanjut" : "Periksa"}
                </Button>
            </div>
        </div>
    );
}
