"use client";

import { useEffect, useRef } from "react";
import { useBisindoModel } from "./use-bisindo-model";

interface BisindoOverlayProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
}

/**
 * Renders a canvas overlay on top of a <video> element that shows:
 * - A green ROI box (like cv2.rectangle in the Python script)
 * - A prediction badge above the box ("A (87.2%)" or "Tidak Dikenali")
 * - A loading indicator while the TF.js model is being fetched
 */
export function BisindoOverlay({ videoRef }: BisindoOverlayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { prediction, isModelLoaded, roiBox } = useBisindoModel(videoRef);

    // Draw the ROI box + prediction text onto the canvas each frame
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Sync canvas size with its rendered size
        const syncAndDraw = () => {
            const { offsetWidth, offsetHeight } = canvas;
            if (canvas.width !== offsetWidth || canvas.height !== offsetHeight) {
                canvas.width = offsetWidth;
                canvas.height = offsetHeight;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (!isModelLoaded || !roiBox) return;

            const cw = canvas.width;
            const ch = canvas.height;

            // Convert normalized ROI to canvas pixels
            const bx = roiBox.x * cw;
            const by = roiBox.y * ch;
            const bSize = roiBox.size * Math.max(cw, ch);

            // --- Green ROI rectangle (like Python's cv2.rectangle) ---
            ctx.strokeStyle = "rgba(0, 255, 0, 0.85)";
            ctx.lineWidth = 2.5;
            ctx.strokeRect(bx, by, bSize, bSize);

            // --- Prediction label above the box ---
            const label = prediction
                ? `${prediction.letter} (${prediction.confidence.toFixed(1)}%)`
                : "Tidak Dikenali";

            const labelColor = prediction ? "#00FF00" : "#FF4444";

            ctx.font = "bold 16px Inter, sans-serif";
            ctx.fillStyle = "rgba(0,0,0,0.55)";
            const textWidth = ctx.measureText(label).width;
            const padding = 8;
            const labelX = bx;
            const labelY = by - 12;
            ctx.fillRect(labelX - padding / 2, labelY - 18, textWidth + padding, 24);

            ctx.fillStyle = labelColor;
            ctx.fillText(label, labelX, labelY);
        };

        const rafId = requestAnimationFrame(function loop() {
            syncAndDraw();
            requestAnimationFrame(loop);
        });

        return () => cancelAnimationFrame(rafId);
    }, [isModelLoaded, prediction, roiBox]);

    return (
        <>
            {/* Loading indicator — shown while TF.js model is being fetched */}
            {!isModelLoaded && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/60 text-white text-[12px] font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                    Memuat model AI…
                </div>
            )}

            {/* Canvas overlay — sits on top of the video, pointer-events disabled */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
            />
        </>
    );
}
