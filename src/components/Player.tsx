import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

type PlayerProps = {
    title: string;
    url: string;
    tone: string;
    page: string;
    onClose?: () => void;
};

export const Player: React.FC<PlayerProps> = ({ title, url, tone, page, onClose }) => {
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    const togglePlay = async () => {
        try {
            if (!sound) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: 'https://bandinhaecc-v2.vercel.app/' + url },
                    { shouldPlay: true }
                );
                const newSound = sound;
                setSound(newSound);
                setIsPlaying(true);

                newSound.setOnPlaybackStatusUpdate((status) => {
                    if ("positionMillis" in status) setPosition(status.positionMillis);
                    if ("durationMillis" in status) setDuration(status.durationMillis || 0);
                    if ("isPlaying" in status) setIsPlaying(status.isPlaying);
                });
            } else {
                if (isPlaying) {
                    await sound.pauseAsync();
                } else {
                    await sound.playAsync();
                }
            }
        } catch (err) {
            console.error("Erro ao tocar áudio:", err);
        }
    };

    const seek = async (ms: number) => {
        if (sound) {
            let newPosition = position + ms;
            if (newPosition < 0) newPosition = 0;
            if (duration && newPosition > duration) newPosition = duration;
            await sound.setPositionAsync(newPosition);
        }
    };

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (

        <View style={styles.modal}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Reprodutor</Text>
                <TouchableOpacity onPress={onClose}>
                    <Text style={styles.closeButton}>✕ Fechar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <View style={styles.trackInfo}>
                    <Text style={styles.trackTitle}>{title}</Text>
                    <Text style={styles.trackTitleTomPage}>Tom: {tone} . Pág:{page}</Text>
                    <Text style={styles.trackMeta}></Text>
                </View>

                <View style={styles.progressContainer}>
                    <Text>{formatTime(position)}</Text>
                    <View style={styles.progressBar}>
                        <View style={[styles.progress]} />
                    </View>
                    <Text>{formatTime(duration)}</Text>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity onPress={() => seek(-10000)} style={styles.controlButton}>
                        <Text>« 10s</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlay} style={styles.controlButton}>
                        <Text>{isPlaying ? "⏸ Pausar" : "▶️ Tocar"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => seek(10000)} style={styles.controlButton}>
                        <Text>10s »</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modal: {
        width: "100%",
        maxWidth: 500,
        backgroundColor: "#fff",
        borderRadius: 12,
        overflow: "hidden",
    },

    header: {
        backgroundColor: "#1c4587",
        height: 80,
        padding: 12,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerTitle: { color: "#fff", fontWeight: "700", fontSize: 24 },
    closeButton: { color: "#fff", fontWeight: "600" },
    body: { padding: 16, gap: 12 },
    trackInfo: { marginBottom: 12 },
    trackTitle: { fontWeight: 800, fontSize: 18 },
    trackTitleTomPage: {fontWeight: "800", fontSize: 16, color: "#91969eff" },
    trackMeta: { color: "#666", fontSize: 14 },
    progressContainer: { flexDirection: "row", alignItems: "center", gap: 10 },
    progressBar: { flex: 1, height: 5, backgroundColor: "#ccc", borderRadius: 3 },
    progress: { height: 5, backgroundColor: "#2196F3", borderRadius: 3 },
    controls: { flexDirection: "row", justifyContent: "space-around", marginTop: 16 },
    controlButton: { paddingHorizontal: 10, paddingVertical: 6, backgroundColor: "#eee", borderRadius: 6 },
});