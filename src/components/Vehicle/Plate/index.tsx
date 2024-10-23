import { View, ImageBackground, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";

import { validateOldBoardModel } from "../../../hooks/validateBoardModel";

import { theme } from "../../../theme";

interface PlateProps {
    text: string;
    style?: StyleProp<ViewStyle>
}

export function Plate({ text, style }: PlateProps) {
    const image = validateOldBoardModel(text) ? require('../../../assets/plate_old.png') : require('../../../assets/plate_new.png');
    return (
        <View style={[styles.plate, theme.shadow, style]}>
            <ImageBackground style={styles.plateImage} source={image}>
                <Text style={styles.plateText}>{text}</Text>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    plate: {
        position: 'absolute',
        top: -30,
        width: 230,
        height: 60,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    plateImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    plateText: {
        fontSize: 30
    },
})