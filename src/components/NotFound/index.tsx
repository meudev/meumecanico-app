import { StyleSheet, Text, View } from "react-native";

import { theme } from "../../theme";

type NotFoundProps = {
    text: string;
};

const NotFound = (props: NotFoundProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    )
}

export default NotFound;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        color: theme.colors.black
    }
})