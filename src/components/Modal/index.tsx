import { ActivityIndicator, Image, Modal as ModalRN, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

import { theme } from "../../theme";

interface IButton {
    text: string;
    onPress: () => void;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'slate-gray';
}

interface ModalProps {
    title: string;
    visible: boolean;
    buttonClose: IButton;
    buttonConfirm?: IButton;
    children: React.ReactNode;
    loading: boolean;
}

export function Modal({ title, visible, buttonClose, buttonConfirm, children, loading }: ModalProps) {
    return (
        <ModalRN
            animationType="slide"
            transparent={true}
            visible={visible}
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>{title.toUpperCase()}</Text>
                    <ScrollView style={styles.body}>
                        {children}
                    </ScrollView>
                    <View style={styles.footer}>
                        <ButtonModal loading={loading} text={buttonClose.text} onPress={buttonClose.onPress} color={buttonClose.color ?? "slate-gray"} />
                        {buttonConfirm &&
                            <ButtonModal loading={loading} text={buttonConfirm.text} onPress={buttonConfirm.onPress} color={buttonConfirm.color ?? "blue"} />
                        }
                    </View>
                </View>
            </View>
        </ModalRN>
    )
}

interface BodyModalProps {
    children: React.ReactNode;
}

export function BodyModal({ children }: BodyModalProps) {
    return <View style={styles.bodyContent}>{children}</View>
}

interface ButtonProps extends TouchableOpacityProps {
    text: string;
    color?: 'blue' | 'green' | 'yellow' | 'red' | 'slate-gray';
    loading: boolean;
}

export function ButtonModal({ text, color = 'blue', loading, ...rest }: ButtonProps) {
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
            {loading ?
                <ActivityIndicator size="small" color="#FFFFFF" />
                :
                <Text style={styles.textButton}>{text.toUpperCase()}</Text>
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 22,
        backgroundColor: theme.colors.shadowColor
    },
    content: {
        position: 'relative',
        width: '90%',
        maxHeight: '70%',
        margin: 20,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        shadowColor: theme.colors.shadowColor,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 1,
    },
    title: {
        paddingVertical: 16,
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.black
    },
    body: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: theme.colors.gray,
        minHeight: 200,
        paddingHorizontal: 16
    },
    bodyContent: {
        paddingVertical: 20,
        gap: 20,
    },
    footer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: theme.colors.gray,
        padding: 16,
        gap: 20
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        gap: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.white
    }
});
