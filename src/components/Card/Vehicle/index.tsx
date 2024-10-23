import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import { theme } from "../../../theme";

interface CardVehicleProps extends TouchableOpacityProps {
    plate: string;
    brand: string;
    model: string;
    color: string;
    km: number;
}

export default function CardVehicle({ plate, brand, model, color, km, ...rest }: CardVehicleProps) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <Image style={styles.photo} source={require('../../../assets/icon-vehicle.png')} />
            <View style={styles.content}>
                <Text style={styles.title}>{model.toUpperCase()}</Text>
                <View style={styles.line}>
                    <Text style={styles.text}>{brand.toUpperCase()}</Text>
                    <Text style={styles.text}>{plate.toUpperCase()}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.text}>{color.toUpperCase()}</Text>
                    <Text style={styles.text}>{km && `KM: ${km}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        gap: 20,
        borderColor: theme.colors.hover,
        backgroundColor: theme.colors.hover
    },
    photo: {
        width: 100,
        height: 100,
        objectFit: 'contain'
    },
    content: {
        flexGrow: 1,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 18,
        fontWeight: '900',
        color: theme.colors.text,
    },
    text: {
        color: theme.colors.text,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})