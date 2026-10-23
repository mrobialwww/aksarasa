import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface PathCardProps {
    title: string;
    description: string;
    features: string[];
    icon: LucideIcon;
    theme: "blue" | "green";
    href: string;
}

export function PathCard({
    title,
    description,
    features,
    icon: Icon,
    theme,
    href
}: PathCardProps) {
    const isBlue = theme === "blue";

    return (
        <Link 
            href={href}
            className="block w-full bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-gray-200 group"
        >
            <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    isBlue 
                        ? "bg-[#e0f2fe] group-hover:bg-[#bae6fd]" 
                        : "bg-[#dcfce7] group-hover:bg-[#bbf7d0]"
                }`}
            >
                <Icon
                    className={`w-6 h-6 ${isBlue ? "text-[#0284c7]" : "text-[#16a34a]"}`}
                    strokeWidth={2}
                />
            </div>
            
            <h2 className="text-[17px] font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors tracking-tight">
                {title}
            </h2>
            <p className="text-gray-500 text-[14.5px] leading-relaxed mb-6">
                {description}
            </p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-3">
                {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2.5 text-[13.5px] text-gray-500">
                        <span className="text-gray-400 text-[10px]">✦</span> 
                        <span>{feature}</span>
                    </div>
                ))}
            </div>
        </Link>
    );
}
