// Apple Music link utilities

export function openAppleMusic(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
}

export function buildAppleMusicSearchUrl(query: string): string {
    const encoded = encodeURIComponent(query);
    return `https://music.apple.com/search?term=${encoded}`;
}

export function buildAppleMusicArtistUrl(artistName: string): string {
    const encoded = encodeURIComponent(artistName);
    return `https://music.apple.com/search?term=${encoded}`;
}

// Format song duration from seconds to mm:ss
export function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
}

// Parse mm:ss duration string to seconds
export function parseDuration(duration: string): number {
    const [m, s] = duration.split(":").map(Number);
    return m * 60 + s;
}

// Get mood color for waveform / UI accents
export function getMoodColor(mood: string): string {
    const moodColors: Record<string, string> = {
        focus: "#8FA882", // sage
        hype: "#C8874A", // amber
        chill: "#B8C4CC", // mist
        sad: "#8B5E3C", // brown
        energetic: "#F0C060", // gold
        lofi: "#D4A574", // warm
    };
    return moodColors[mood] ?? "#C8874A";
}

// Get mood emoji
export function getMoodEmoji(mood: string): string {
    const moodEmoji: Record<string, string> = {
        focus: "🎯",
        hype: "🔥",
        chill: "🌊",
        sad: "🌧️",
        energetic: "⚡",
        lofi: "☕",
    };
    return moodEmoji[mood] ?? "🎵";
}