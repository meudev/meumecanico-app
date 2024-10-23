import { ScrollView, StyleSheet, View } from 'react-native';

import { theme } from '../../theme';
import Constants from 'expo-constants';

interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

export function Content({ children }: ContainerProps) {
    return (
        <ScrollView contentContainerStyle={styles.content}>
            {children}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        paddingTop: Constants.statusBarHeight,
        marginBottom: 15,
        backgroundColor: theme.colors.white
    },
    content: {
        flexGrow: 1,
        padding: 16,
        rowGap: 10
    }
});
