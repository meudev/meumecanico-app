import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InvoiceProductsCreateInterface, InvoiceProductsInterface } from "../../../interfaces/InvoiceProductsInterface";
import { theme } from "../../../theme";
import { formattedAmount } from "../../../hooks/converter";
import { ButtonHeader } from "../../Header";
import { Trash } from "phosphor-react-native";

interface CardProductProps {
    product: InvoiceProductsCreateInterface | InvoiceProductsInterface;
    options?: boolean;
}

export function HeaderListProducst({ options = false }: { options?: boolean }) {
    return (
        <View style={styles.productContainerHeader}>
            <View style={styles.width}>
                <View style={styles.line}>
                    <Text style={styles.title}>DESCRIÇÃO PRODUTO / SERVIÇO</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.title}>QUANTIA</Text>
                    <Text style={styles.title}>VALOR</Text>
                    <Text style={styles.title}>DESCONTO</Text>
                    <Text style={styles.title}>VLR TOTAL</Text>
                </View>
            </View>
            {options && <View style={styles.optionsContainer} />}
        </View>
    )
}

export function FooterListProducts({ total }: { total: number }) {
    return (
        <View style={styles.productContainerFooter}>
            <Text style={styles.title}>VALOR TOTAL</Text>
            <Text style={styles.title}>{formattedAmount(total)}</Text>
        </View>
    )
}

export function CardProduct({ product, options }: CardProductProps) {
    return (
        <View style={styles.productContainer}>
            <View style={styles.width}>
                <View style={styles.line}>
                    <Text style={styles.text}>{product.name.toUpperCase()}</Text>
                </View>
                <View style={styles.line}>
                    <Text style={styles.text}>{product.quantity}</Text>
                    <Text style={styles.text}>{formattedAmount(product.value)}</Text>
                    <Text style={styles.text}>{product.discount > 0 && formattedAmount(product.discount)}</Text>
                    <Text style={styles.text}>{formattedAmount(product.total)}</Text>
                </View>
            </View>
            {options &&
                <View style={styles.optionsContainer}>
                    <TouchableOpacity style={styles.button}><Trash size={20} color={theme.colors.white} /></TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    productContainerHeader: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.black
    },
    width: {
        flex: 1,
        gap: 5
    },
    productContainerFooter: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: theme.colors.black
    },
    productContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingVertical: 8,
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        fontSize: 16
    },
    title: {
        fontSize: 16,
        fontWeight: '600'
    },
    optionsContainer: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: theme.colors.red
    }
})