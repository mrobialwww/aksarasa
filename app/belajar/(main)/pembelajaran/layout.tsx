import { Sidebar } from "@/components/sidebar";

export default function PembelajaranLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#fafafa] flex font-sans selection:bg-blue-100">
            <Sidebar />
            <div className="flex-1 p-6 h-screen overflow-hidden">
                <main className="w-full h-full bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
