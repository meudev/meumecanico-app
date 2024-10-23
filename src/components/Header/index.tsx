import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { IconContext } from 'phosphor-react-native';

import { theme } from "../../theme";

interface HeaderProps {
    children?: React.ReactNode;
    position?: 'row' | 'row-reverse';
    title: string;
}

export function Header({ children, position = 'row', title }: HeaderProps) {
    return (
        <View style={[styles.container, { flexDirection: position }]}>
            <Text style={styles.title}>{title}</Text>
            {children}
        </View>
    )
}

export interface ButtonProps extends TouchableOpacityProps {
    icon: any;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'slate-gray';
}

export function ButtonHeader({ icon, color = 'blue', ...rest }: ButtonProps) {
    function validateColor(color: string) {
        switch (color) {
            case 'blue':
                return '#009EFA'
            case 'green':
                return '#0C9348'
            case 'yellow':
                return '#F2C138'
            case 'red':
                return '#FF0000'
            case 'slate-gray':
                return '#54667A'
        }
    }

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: validateColor(color) }]} {...rest}>
            <IconContext.Provider
                value={{
                    color: theme.colors.white,
                    size: 22,
                    weight: 'bold',
                }}
            >
                {icon}
            </IconContext.Provider>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        gap: 15,
        borderBottomWidth: 1,
        borderColor: theme.colors.hover
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        color: theme.colors.black
    },
    button: {
        flexDirection: 'row',
        height: 40,
        width: 40,
        gap: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.blue
    },
    text: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.white
    }
})