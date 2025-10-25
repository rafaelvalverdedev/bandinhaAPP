import React, { useState, useEffect } from "react";
import { StatusBar, ScrollView, StyleSheet, View, Text, ActivityIndicator, useWindowDimensions } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLUMNS } from "./src/data/musicas";
import { Column } from "./src/components/Column";

export default function App() {
    const { width, height } = useWindowDimensions();
    const [isReady, setIsReady] = useState(false);

    const isLandscape = width > height;
    const isTabletOrWeb = width >= 600;

    // Simula tempo de carregamento/layout
    useEffect(() => {
        const timer = setTimeout(() => setIsReady(true), 500); // meio segundo de "loading"
        return () => clearTimeout(timer);
    }, [width, height]);

    return (
        <SafeAreaProvider>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeAreaView}>
                <StatusBar backgroundColor="#1c4587" translucent={true} />

                {!isReady ? (
                    // Tela de loading
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#1c4587" />
                        <Text>Carregando Músicas...</Text>
                    </View>
                ) : (
                    // Conteúdo principal
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator>
                        <View
                            style={[
                                styles.container,
                                isLandscape || isTabletOrWeb
                                    ? styles.columnLayout
                                    : styles.rowLayout,
                            ]}
                        >
                            {COLUMNS.map((col, idx) => (
                                <Column key={idx} title={col.title} items={col.items} />
                            ))}
                        </View>
                    </ScrollView>
                )}
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        backgroundColor: "#1c4587",
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dddee0",
    },

    scrollContent: {
        flexGrow: 1,
        backgroundColor: "#dddee0",
        paddingBottom: 40,
    },

    container: {
        backgroundColor: "#dddee0",
    },

    rowLayout: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },

    columnLayout: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
});
