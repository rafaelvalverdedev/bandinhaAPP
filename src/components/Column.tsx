import React, { useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import { MusicRow } from "./MusicRow";

import { Player } from './Player';

type Item = {
    id?: string;
    type?: string;
    title?: string;
    lyrics?: string;
    tone?: string;
    page?: number;
    label?: string;
    time?: string;
    url?: string;
    duration?: string;
    pagHead?: string;
};

type Props = {
    title: string;
    items: Item[];
};

export const Column: React.FC<Props> = ({ title, items }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<{
        page: string;
        tone: string;
        title: string;
        url: string;
    } | null>(null);

    const handlePress = (title: string, url: string, p0: string, p1: string | number) => {
        setCurrentTrack({ title, url, tone: p0, page: String(p1) });
        setModalVisible(true);
    };

    return (
        <View style={styles.column}>
            <Text style={styles.header}>{title}</Text>

            {items.map((it, idx) => {
                if (it.type === "section") {
                    return (
                        <View key={idx} style={styles.section}>
                            <Text style={[styles.sectionText, styles.col1]}>{it.time}</Text>
                            <Text style={[styles.sectionText, styles.col2]}>{it.label}</Text>
                            <Text style={[styles.sectionText, styles.col3]}>{it.duration}</Text>
                            <Text style={[styles.sectionText, styles.col4]}>{it.pagHead}</Text>
                        </View>
                    );
                }

                return (
                    <MusicRow
                        key={it.id || idx}
                        type={it.type}
                        title={it.title || ""}
                        lyrics={it.lyrics}
                        tone={it.tone}
                        label={it.label}
                        page={it.page}
                        onPress={() => handlePress(it.title || "", it.url || "", it.tone || "", it.page || "")}
                    />
                );
            })}

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {currentTrack && (
                            <Player
                                title={currentTrack.title}
                                url={currentTrack.url}
                                tone={currentTrack.tone}
                                page={currentTrack.page}
                                onClose={() => setModalVisible(false)}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    column: {
        flexShrink: 1,

        minWidth: 300,
        maxWidth: 420,
        borderRightWidth: 1,
        borderRightColor: "#fff",

    },

    header: { // SEXTA - SBADO - DOMINGO
        backgroundColor: "#1c4587",
        color: "#fff",
        padding: 10,
        fontWeight: 700,
        fontSize: 16,
        textAlign: "center",
        minWidth: "100%",
    },

    section: { // PATIO - PLENARIO 
        backgroundColor: "#9fc5e8",
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
    },

    sectionText: {
        fontWeight: 700,
        color: "#003366",
    },

    col1: {
        width: 45,
        fontSize: 12,
    },

    col2: {
        flex: 1,
        textAlign: "center",
    },

    col3: {
        width: 40,
        fontSize: 12,

    },

    col4: {
        width: 40,
        fontSize: 12,
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: '100%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },

    closeButtonText: { color: 'white', fontWeight: 'bold' },
});