import { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Check } from "phosphor-react-native"

import { theme } from "../../../theme"

interface CardUpdateKmProps {
    idVehicle: string;
    nameVehicle: string;
    plate: string;
}

export function CardUpdateKm({ idVehicle, nameVehicle, plate }: CardUpdateKmProps) {
    const [newKm, setNewKm] = useState('')

    function handleUpdate() {
        Alert.alert('Sucesso', 'KM atualizado.')
    }

    return (
        <View style={styles.cardContainer}>
            <View style={styles.contentTitle}>
                <Text style={styles.title}>{nameVehicle}</Text>
                <Text style={styles.title}>{plate}</Text>
            </View>
            <View style={styles.cardContent}>
                <TextInput
                    style={styles.input}
                    placeholder='Insira o KM Atual'
                    keyboardType='decimal-pad'
                    value={newKm}
                    onChangeText={setNewKm}
                />
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Check color='#009EFA' />
                </TouchableOpacity>
                <View style={styles.contentInfo}>
                    <Image style={styles.photo} source={require('../../../assets/icon-vehicle.png')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        marginTop: 35,
        borderRadius: 5,
        padding: 16,
        gap: 10,
        backgroundColor: theme.colors.blue
    },
    cardContent: {
        flexDirection: 'row',
    },
    input: {
        flex: 1,
        height: 50,
        padding: 15,
        borderRadius: 5,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: theme.colors.white,
        fontSize: 20
    },
    button: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        backgroundColor: theme.colors.white
    },
    contentInfo: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        zIndex: 1,
        top: -84,
        gap: 20,
    },
    photo: {
        width: 101,
        height: 50,
        objectFit: 'contain',
    },
    contentTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        color: theme.colors.white
    }
})