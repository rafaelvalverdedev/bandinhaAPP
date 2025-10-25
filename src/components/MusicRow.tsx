import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";



type Props = {
    title: string;
    lyrics?: string;
    tone?: string;
    page?: number;
    type?: string;
    label?: string;
    onPress?: () => void;
};

export const MusicRow: React.FC<Props> = ({ title, lyrics, tone, page, type, label, onPress }) => (

    <TouchableOpacity style={styles.row} onPress={onPress}>

        {(type === "note")
            ?
            <Text style={styles.label}>{label}</Text>
            :
            <>
                <Text style={[styles.col1, styles.playIcon]}>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                        <Path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3ZM5 1C2.79086 1 1 2.79086 1 5V19C1 21.2091 2.79086 23 5 23H19C21.2091 23 23 21.2091 23 19V5C23 2.79086 21.2091 1 19 1H5Z"
                            fill="currentColor"
                        />
                        <Path
                            d="M16 12L10 16.3301V7.66987L16 12Z"
                            fill="currentColor"
                        />
                    </Svg>
                </Text>
                <View style={styles.col2}>
                    <Text style={styles.title} numberOfLines={1}>{title}</Text>
                    <Text style={styles.lyrics} numberOfLines={1}>{lyrics}</Text>
                </View>
                <Text style={styles.col3}>
                    <Text style={styles.tone}>{tone}</Text>
                </Text>
                <Text style={styles.col4}>
                    <Text style={styles.page}>{page}</Text>
                </Text>
            </>
        }
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    row: {
        justifyContent: "center",
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        height: 60,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 5,
        paddingRight: 5,
        
    },
    title: {
        fontWeight: 400,
        color: "#000",
        marginLeft: 10,
        fontSize: 16,
    },

    lyrics: {
        fontWeight: 400,
        color: "#2E75B6",
        marginLeft: 10,
        fontSize: 16,
        overflow: "hidden",
    },

    label: {
        fontWeight: 700,
        color: "#2b2b2bff",
        alignItems: "center",
        fontSize: 16,
    },


    tone: { width: 40, textAlign: "center", color: "#333" },
    page: { width: 40, textAlign: "center", color: "#333" },

    playIcon: {
        width: 36,
        height: 36,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#81a0bdff",
        padding: 5,
    },

    col1: {
        width: 45,
        fontSize: 12,
        fontWeight: "normal",
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
    }
});
