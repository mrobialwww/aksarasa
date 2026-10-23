import { LucideIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ActionCardProps {
    title: string;
    description: string;
    features: string[];
    buttonText: string;
    icon: LucideIcon;
    theme: "blue" | "purple";
    onClick?: () => void;
    href?: string;
}

export function ActionCard({
    title,
    description,
    features,
    buttonText,
    icon: Icon,
    theme,
    onClick,
    href,
}: ActionCardProps) {
    const isBlue = theme === "blue";
    
    const buttonClass = `h-10 w-full rounded-2xl px-4 text-sm leading-5 font-medium text-[#0A0A0A] flex items-center justify-center gap-2 transition-colors group ${
        isBlue
            ? "bg-[#96D8F8] hover:bg-[#82cef3]"
            : "bg-[#C3C9FF] hover:bg-[#b0b8fc]"
    }`;

    return (
        <article className="flex w-full max-w-[324px] flex-col gap-6 rounded-[30px] border-2 border-[#F5F5F5] bg-white">
            <header className="relative h-[208px] w-full shrink-0">
                <div
                    className={`absolute left-6 top-6 flex size-12 items-center justify-center rounded-[14px] ${
                        isBlue ? "bg-[#96D8F880]" : "bg-[#C3C9FF80]"
                    }`}
                >
                    <Icon className="size-6 text-[#0A0A0A]" strokeWidth={2} />
                </div>

                <h2 className="absolute left-6 top-[88px] text-base leading-4 font-medium text-[#0A0A0A]">
                    {title}
                </h2>
                <p className="absolute left-6 top-28 w-[272px] text-base leading-6 font-normal text-[#717182]">
                    {description}
                </p>
            </header>

            <ul className="flex flex-1 flex-col px-6 text-sm leading-5 font-normal text-[#717182]">
                {features.map((feature, index) => (
                    <li
                        key={index}
                        className={index === 0 ? "" : "pt-2"}
                    >
                        ✦ {feature}
                    </li>
                ))}
            </ul>

            <footer className="px-6 pb-6">
                {href ? (
                    <Link href={href} className={buttonClass}>
                        <span>{buttonText}</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                    </Link>
                ) : (
                    <Button onClick={onClick} className={buttonClass}>
                        <span>{buttonText}</span>
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={2} />
                    </Button>
                )}
            </footer>
        </article>
    );
}
