import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { theme } from "../../theme";

export interface ButtonProps extends TouchableOpacityProps {
    text: string;
    loading: boolean;
    type?: 'primary' | 'secondary';
}

export default function Button({ text, loading, type = 'primary', ...rest }: ButtonProps) {
    return (
        <TouchableOpacity style={[styles.container, type == 'secondary' && styles.containerSecondary]} disabled={loading} {...rest}>
            {loading ?
                <ActivityIndicator size="small" color={type == 'primary' ? theme.colors.white : theme.colors.blue} />
                :
                <Text style={[styles.text, type == 'secondary' && styles.textSecondary]}>{text.toUpperCase()}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.blue
    },
    containerSecondary: {
        borderWidth: 1,
        borderColor: theme.colors.blue,
        backgroundColor: theme.colors.white
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.white
    },
    textSecondary: {
        color: theme.colors.blue
    }
});
