import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme";

interface EmptyProps {
    text: string;
}

export default function Empty({ text }: EmptyProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
        fontWeight: '600',
        color: theme.colors.black
    }
})