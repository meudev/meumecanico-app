import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { theme } from "../../theme";
import React from "react";

interface CheckboxProps extends TouchableOpacityProps {
    selected: boolean;
    label: string;
}

export function Checkbox({ selected, label, ...props }: CheckboxProps) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.checkbox} {...props}>
                {selected && <View style={styles.checkboxActive} />}
            </TouchableOpacity>
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}


interface CheckboxContainerProps {
    label: string;
    required?: boolean;
    children: React.ReactNode;
}

export function CheckboxContainer({ label, required, children }: CheckboxContainerProps) {
    return (
        <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxLabel}>{label} {required && <Text style={styles.checkboxLabelRequired}>*</Text>}</Text>
            <View style={styles.checkboxContent}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    checkbox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: theme.colors.blue
    },
    checkboxActive: {
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: theme.colors.blue
    },
    label: {
        fontSize: 16,
        color: theme.colors.black
    },


    checkboxContainer: {
        width: '100%',
        gap: 10
    },
    checkboxContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40
    },
    checkboxLabel: {
        fontSize: 16,
        color: theme.colors.text
    },
    checkboxLabelRequired: {
        color: theme.colors.red
    }
})