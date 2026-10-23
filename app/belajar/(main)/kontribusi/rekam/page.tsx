import { Suspense } from "react";
import { RecordingView } from "@/components/recording-view";

export default function RekamPage() {
    return (
        <div className="w-full h-full p-4 md:p-8">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center">Loading camera...</div>}>
                <RecordingView />
            </Suspense>
        </div>
    );
}
