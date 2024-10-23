import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import MaskInput, { Mask, MaskInputProps } from 'react-native-mask-input';

import { theme } from "../../theme";

interface InputProps extends MaskInputProps {
    label: string;
    loading: boolean;
    required?: boolean;
    mask?: Mask;
}

export default function Input({ label, loading, required, mask, ...rest }: InputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{label} {required && <Text style={styles.textRequired}>*</Text>}</Text>
            {/* <TextInput style={styles.input} editable={!loading}  {...rest} /> */}
            <MaskInput style={styles.input} editable={!loading}  {...rest} mask={mask} autoCapitalize="none"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 5
    },
    text: {
        fontSize: 16,
        color: theme.colors.text
    },
    textRequired: {
        color: theme.colors.red
    },
    input: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        borderColor: theme.colors.gray,
        color: theme.colors.text,
        fontSize: 16
    }
})