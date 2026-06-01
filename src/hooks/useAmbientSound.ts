import { useState, useEffect, useRef, useCallback } from "react";

export function useAmbientSound(src = "/audio/ambient-lofi.mp3") {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolumeState] = useState(0.3);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = volume;
        audio.preload = "none";

        audio.addEventListener("canplaythrough", () => setIsLoaded(true));
        audioRef.current = audio;

        return () => {
            audio.pause();
            audio.src = "";
        };
    }, [src]);

    const toggle = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play().then(() => setIsPlaying(true)).catch(() => { });
        }
    }, [isPlaying]);

    const setVolume = useCallback((v: number) => {
        const clamped = Math.max(0, Math.min(1, v));
        setVolumeState(clamped);
        if (audioRef.current) audioRef.current.volume = clamped;
    }, []);

    return { isPlaying, volume, toggle, setVolume, isLoaded };
}