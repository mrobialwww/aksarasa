"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";

const CLASS_NAMES = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
];

const IMG_SIZE = 224;
const CONFIDENCE_THRESHOLD = 50; // same as Python script
const INFERENCE_INTERVAL_MS = 150;

export interface BisindoPrediction {
    letter: string;
    confidence: number; // 0–100
}

export interface UseBisindoModelReturn {
    prediction: BisindoPrediction | null;
    isModelLoaded: boolean;
    isDetecting: boolean;
    /** Normalized ROI box (0–1) relative to video size, for drawing on canvas */
    roiBox: { x: number; y: number; size: number } | null;
}

/**
 * Replicates the Python inference script logic in-browser via TF.js.
 *
 * Pipeline per frame:
 *   video → crop center ROI → resize 224×224 → model.predict() → argmax → letter
 */
export function useBisindoModel(
    videoRef: React.RefObject<HTMLVideoElement | null>
): UseBisindoModelReturn {
    const modelRef = useRef<tf.GraphModel | tf.LayersModel | null>(null);
    const offscreenCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [isDetecting, setIsDetecting] = useState(false);
    const [prediction, setPrediction] = useState<BisindoPrediction | null>(null);
    const [roiBox, setRoiBox] = useState<{ x: number; y: number; size: number } | null>(null);

    // Load the TF.js model once on mount
    useEffect(() => {
        let cancelled = false;

        async function loadModel() {
            try {
                const model = await tf.loadGraphModel("/models/bisindo_model/model.json");
                if (!cancelled) {
                    modelRef.current = model as tf.GraphModel;
                    setIsModelLoaded(true);
                }
            } catch (err) {
                console.error("[BisindoModel] Failed to load model:", err);
            }
        }

        loadModel();

        return () => {
            cancelled = true;
        };
    }, []);

    // Inference loop — starts after model is loaded and video is ready
    const runInference = useCallback(async () => {
        const video = videoRef.current;
        const model = modelRef.current;

        if (!video || !model || video.readyState < 2) return;

        const vw = video.videoWidth;
        const vh = video.videoHeight;
        if (vw === 0 || vh === 0) return;

        // --- Replicate Python script: crop a fixed center box ---
        const boxPx = Math.min(vw, vh) * 0.6; // ~60% of the shorter side
        const x1 = (vw - boxPx) / 2;
        const y1 = (vh - boxPx) / 2;

        // Expose normalized ROI for canvas drawing
        setRoiBox({ x: x1 / vw, y: y1 / vh, size: boxPx / Math.max(vw, vh) });

        // --- Crop + resize via offscreen canvas ---
        if (!offscreenCanvasRef.current) {
            offscreenCanvasRef.current = document.createElement("canvas");
        }
        const canvas = offscreenCanvasRef.current;
        canvas.width = IMG_SIZE;
        canvas.height = IMG_SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // The video is mirrored with CSS (-scale-x-100), but videoWidth/Height are raw.
        // We mirror it here when drawing so the crop matches what the user sees.
        ctx.save();
        ctx.translate(IMG_SIZE, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, x1, y1, boxPx, boxPx, 0, 0, IMG_SIZE, IMG_SIZE);
        ctx.restore();

        // --- TF.js predict ---
        const inputTensor = tf.tidy(() => {
            const pixels = tf.browser.fromPixels(canvas); // shape [224, 224, 3]
            // GraphModel includes the Rescaling layer baked into the frozen graph.
            // Input: raw uint8 [0–255], output: softmax probabilities over 26 classes.
            return pixels.expandDims(0).cast('float32'); // shape [1, 224, 224, 3]
        });

        try {
            const outputTensor = model.predict(inputTensor) as tf.Tensor;
            const scores = await outputTensor.data();
            outputTensor.dispose();

            const maxIdx = scores.indexOf(Math.max(...Array.from(scores)));
            const confidence = scores[maxIdx] * 100;

            setIsDetecting(true);
            if (confidence >= CONFIDENCE_THRESHOLD) {
                setPrediction({ letter: CLASS_NAMES[maxIdx], confidence });
            } else {
                setPrediction(null); // below threshold → "Tidak Dikenali"
            }
        } catch (err) {
            console.error("[BisindoModel] Inference error:", err);
        } finally {
            inputTensor.dispose();
        }
    }, [videoRef]);

    useEffect(() => {
        if (!isModelLoaded) return;

        intervalRef.current = setInterval(runInference, INFERENCE_INTERVAL_MS);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsDetecting(false);
        };
    }, [isModelLoaded, runInference]);

    return { prediction, isModelLoaded, isDetecting, roiBox };
}
