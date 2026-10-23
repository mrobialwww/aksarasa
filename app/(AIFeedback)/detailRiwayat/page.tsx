import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, MapPin, MoveRight, ScanLine } from "lucide-react";
import { historyItems } from "@/data/history";

interface DetailRiwayatPageProps {
    searchParams: Promise<{ id?: string }>;
}

const feedbackSteps = [
    { label: "Handshape", icon: CheckCircle2, key: "handShape" as const },
    { label: "Lokasi", icon: MapPin, key: "position" as const },
    { label: "Orientasi", icon: ScanLine, key: "expression" as const },
    { label: "Gerakan", icon: MoveRight, key: "movement" as const },
];

export default async function DetailRiwayatPage({ searchParams }: DetailRiwayatPageProps) {
    const { id } = await searchParams;
    const item = historyItems.find((historyItem) => historyItem.id === id);

    if (!item) {
        return (
            <main className="grid min-h-screen place-items-center bg-[#fafafa] p-6">
                <section className="rounded-3xl border border-[#e8e8e8] bg-white px-10 py-12 text-center">
                    <h1 className="text-xl font-semibold text-[#1e1e1e]">Riwayat tidak ditemukan</h1>
                    <Link href="/" className="mt-4 inline-flex text-sm font-medium text-[#1677ff] hover:underline">
                        Kembali ke beranda
                    </Link>
                </section>
            </main>
        );
    }

    const word = item.word ?? item.title;
    const state = item.isCorrect
        ? {
              illustration: "/success-gesture.svg",
              accent: "#22c55e",
              soft: "#eaf9ef",
              label: word,
          }
        : {
              illustration: "/failed-gesture.svg",
              accent: "#ff5067",
              soft: "#fff0f2",
              label: "Gerakan Tidak Terdeteksi",
          };

    return (
        <main className="h-dvh overflow-hidden bg-[#fafafa] px-4 py-5 md:px-6 md:py-6 lg:px-8">
            <section className="mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[28px] bg-white px-6 py-5 shadow-[0_12px_40px_rgba(30,30,30,0.035)] md:px-8 md:py-7 lg:px-10 lg:py-8">
                <header className="relative mb-10 flex h-10 items-center justify-between">
                    <Link
                        href="/"
                        aria-label="Kembali ke riwayat AI Feedback"
                        className="grid size-10 place-items-center rounded-full border border-[#ededed] text-[#161616] transition-colors hover:bg-[#fafafa]"
                    >
                        <ArrowLeft className="size-5" strokeWidth={2.2} />
                    </Link>
                    <span className="absolute left-1/2 -translate-x-1/2 rounded-full border border-[#ebebeb] bg-white px-4 py-2 text-xl font-semibold text-[#1e1e1e] shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
                        {word}
                    </span>
                </header>

                <div className="mx-auto grid min-h-0 w-full max-w-295 flex-1 gap-4 lg:grid-cols-[minmax(0,691fr)_minmax(0,704fr)]">
                    <section className="flex h-174.5 min-h-0 flex-col gap-5 overflow-hidden rounded-[20px] border border-[#666b6c] bg-white p-5">
                        <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg">
                            <Image
                                src="/gesture.png"
                                alt={`Rekaman gerakan ${word}`}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 651px"
                            />
                        </div>
                        <div
                            className="relative h-83 shrink-0 overflow-hidden rounded-xl border-2 border-[#eeeeee]"
                            style={{ backgroundColor: state.soft }}
                        >
                            <Image
                                src={state.illustration}
                                alt={item.isCorrect ? `Gerakan ${word} berhasil` : "Gerakan tidak terdeteksi"}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 651px"
                            />
                            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-[24px] border-2 border-[#f5f5f5] bg-white px-7 py-4 shadow-sm">
                                <span
                                    className={`grid size-5 place-items-center rounded-full text-[11px] font-bold text-white ${item.isCorrect ? "bg-[#22c55e]" : "bg-[#ff5067]"}`}
                                    aria-hidden="true"
                                >
                                    {item.isCorrect ? "✓" : "×"}
                                </span>
                                <p className="text-center text-xl font-medium leading-6 text-[#424242]">
                                    {item.isCorrect ? word : "Gerakan Tidak Terdeteksi"}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="h-174.5 min-h-0 overflow-hidden rounded-[20px] border border-[#666b6c] bg-white px-0 pb-10 pt-5">
                        <div className="flex h-full items-start gap-3 pr-6">
                            <Image
                                src="/robot.svg"
                                alt="Asisten AI Aksarasa"
                                width={121}
                                height={121}
                                className="h-auto w-[clamp(76px,8.5vw,121px)] shrink-0 object-contain"
                            />

                            <div className="relative h-full min-h-0 min-w-0 flex-1 rounded-[20px] border-2 border-[#eeeeee] bg-white px-8 py-7 text-[clamp(12px,1.1vw,16px)] font-medium leading-[1.2] text-[#424242] md:px-10 md:py-8">
                                <span
                                    aria-hidden="true"
                                    className="absolute -left-3.25 top-10 size-6 rotate-45 border-b-2 border-l-2 border-[#eeeeee] bg-white"
                                />

                                <div className="relative">
                                    <h1 className="font-medium">Gesture Terdeteksi: {word}</h1>

                                    <p className="mt-6 whitespace-pre-line">{item.feedback}</p>

                                    <p className="mt-6">
                                        {item.isCorrect
                                            ? `Gesture dikenali sebagai kata “${word}” dalam BISINDO.`
                                            : "Gesture belum dapat dikenali sebagai kata yang dimaksud dalam BISINDO."}
                                    </p>

                                    <h2 className="mt-6 font-medium">Evaluasi</h2>

                                    <ul className="mt-6 space-y-6" role="list">
                                        {feedbackSteps.map(({ label, key }) => (
                                            <li key={label} className="flex items-start gap-2">
                                                <CheckCircle2
                                                    className="mt-0.5 size-6 shrink-0 text-green-600"
                                                    fill="currentColor"
                                                    stroke="white"
                                                    strokeWidth={2.5}
                                                    aria-hidden="true"
                                                />
                                                <div className="min-w-0">
                                                    <p>{label}</p>
                                                    <p className="mt-1">{item.details?.[key]}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="mt-6">
                                        {item.isCorrect ? "Tidak ada koreksi yang diperlukan." : "Masih ada koreksi yang diperlukan."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </main>
    );
}
