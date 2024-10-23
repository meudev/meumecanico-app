import { StyleSheet, Text, View } from "react-native"

import { theme } from "../../theme"

interface ProgressProps {
    currentStep: number;
    totalSteps: number;
}

export function Progress({ currentStep, totalSteps }: ProgressProps) {
    return (
        <View style={styles.container}>
            <View style={styles.progress} />
            <View style={[styles.progress, { width: `${100 / (totalSteps - 1) * (currentStep - 1)}%`, borderColor: theme.colors.blue }]} />
            {Array.from(Array(totalSteps), (item, index) => {
                return (
                    <View style={[styles.step, currentStep >= index + 1 && styles.stepActive]} key={index}>
                        <Text style={styles.stepText}>{index + 1}</Text>
                    </View>
                )
            })}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    step: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gray
    },
    stepActive: {
        backgroundColor: theme.colors.blue
    },
    stepText: {
        fontSize: 26,
        fontWeight: '600',
        color: theme.colors.white
    },
    progress: {
        position: 'absolute',
        borderWidth: 3,
        borderColor: theme.colors.gray,
        width: '100%',
        height: 2,
    }
})