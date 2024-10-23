import { useState } from 'react';
import { router } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { Plus } from 'phosphor-react-native';

import { Container, Content } from '../../../components/Container';
import { Header } from '../../../components/Header';
import { Progress } from '../../../components/Progress';
import Input from '../../../components/Input';
import { BodyModal, ButtonModal, Modal } from '../../../components/Modal';

import { InvoiceProductsCreateInterface } from '../../../interfaces/InvoiceProductsInterface';

import { theme } from '../../../theme';
import { CNPJ_MASK, CURRENCY_MASK, DATE_MASK, PHONE_MASK } from '../../../types/input';
import { Checkbox, CheckboxContainer } from '../../../components/Checkbox';
import { CardProduct, FooterListProducts, HeaderListProducst } from '../../../components/Card/Invoce';
import { validateCnpj } from '../../../hooks/validateForms';
import { formattedCnpj } from '../../../hooks/converter';
import { useAuth } from '../../../context/auth';
import { createInvoice } from '../../../database/offline/repository';

export default function NewServices() {
    const { user, vehicle } = useAuth();
    const [loading, setLoading] = useState(false);
    const [totalSteps, setTotalSteps] = useState(3);
    const [currentStep, setCurrentStep] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    const [invoiceDate, setInvoiceDate] = useState('');
    const [invoiceCnpj, setInvoiceCnpj] = useState('');
    const [invoiceName, setInvoiceName] = useState('');
    const [invoiceTelephone, setInvoiceTelephone] = useState('');
    const [invoiceStreet, setInvoiceStreet] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [invoiceDistrit, setInvoiceDistrit] = useState('');
    const [invoiceCity, setInvoiceCity] = useState('');
    const [invoiceState, setInvoiceState] = useState('');
    const [invoiceZipCode, setInvoiceZipCode] = useState('');

    const [productName, setProductName] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productValue, setProductValue] = useState('');
    const [productDiscount, setProductDiscount] = useState('');
    const [productTotal, setProductTotal] = useState('');
    const [productNextExchange, setProductNextExchange] = useState('');
    const [productNextExchangeType, setProductNextExchangeType] = useState<'km' | 'date' | ''>('');
    const [listProducts, setLisProducts] = useState<InvoiceProductsCreateInterface[]>([]);

    async function handleNext() {
        if (currentStep == 1) {
            if (invoiceDate.length != 10) return Alert.alert('Atenção', 'Data inválida.');
            if (!validateCnpj(invoiceCnpj)) return Alert.alert('Atenção', 'CNPJ inválido.');
            if (invoiceName.length <= 2) return Alert.alert('Atenção', 'Nome da empresa inválido.');
            if (invoiceTelephone.length < 10) return Alert.alert('Atenção', 'Telefone inválido.');
        }

        if (currentStep == 2) {
            if (Object.keys(listProducts).length == 0) return Alert.alert('Atenção', 'Você não adicionou nenhum produto ou serviço ainda.')
        }

        if (currentStep == 3) {
            try {
                await createInvoice({
                    idVehicle: vehicle?.id!,
                    idUser: user?.id!,
                    name: invoiceName,
                    cnpj: invoiceCnpj,
                    street: invoiceStreet,
                    number: invoiceNumber,
                    district: invoiceDistrit,
                    city: invoiceCity,
                    state: invoiceState,
                    zipCode: invoiceZipCode,
                    telephone: invoiceTelephone,
                    date: invoiceDate,
                    discount: 0,
                    products: listProducts,
                });

                clearFormProducts()
                setLoading(false)
                router.push('(tabs)/services')
                return Alert.alert('Sucesso', 'Nota cadastrada com sucesso.');
            } catch (error) {
                setLoading(false)
                return Alert.alert('Atenção', 'Falha ao cadastrar nota.');
            }
        }

        setCurrentStep(currentStep + 1)
    }

    function handlePrevious() {
        if (currentStep == 1) return router.push('(tabs)/services')
        setCurrentStep(currentStep - 1)
    }

    function clearFormProducts() {
        setProductName('')
        setProductQuantity('')
        setProductValue('')
        setProductDiscount('')
        setProductTotal('')
        setProductNextExchange('')
        setProductNextExchangeType('')
    }

    function handleCloseModal() {
        setModalVisible(false)
        clearFormProducts()
    }

    function handleModalSaveProduct() {
        setLisProducts([...listProducts, {
            name: productName,
            quantity: Number(productQuantity),
            value: Number(productValue),
            discount: Number(productDiscount),
            total: Number(productTotal),
            nextExchange: productNextExchange,
            nextExchangeType: productNextExchangeType
        }])
        setModalVisible(false)
        clearFormProducts()
    }

    return (
        <Container>
            <Header title='Novo Serviço'><></></Header>
            <Content>
                <Progress currentStep={currentStep} totalSteps={totalSteps} />
                {currentStep == 1 &&
                    <Form
                        loading={loading}
                        title='Dados da Nota'
                        textButtonPrevious='Cancelar'
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                    >
                        <Input label='Data' value={invoiceDate} onChangeText={setInvoiceDate} loading={loading} mask={DATE_MASK} required />
                        <Input label='CNPJ' value={invoiceCnpj} onChangeText={(masked, unmasked) => setInvoiceCnpj(unmasked)} loading={loading} mask={CNPJ_MASK} required />
                        <Input label='Nome da Empresa' value={invoiceName} onChangeText={e => setInvoiceName(e.toUpperCase())} loading={loading} required />
                        <Input label='Telefone' value={invoiceTelephone} onChangeText={e => setInvoiceTelephone(e.toUpperCase())} loading={loading} mask={PHONE_MASK} required />
                        <Input label='Logradouro' value={invoiceStreet} onChangeText={e => setInvoiceStreet(e.toUpperCase())} loading={loading} />
                        <Input label='Número' value={invoiceNumber} onChangeText={e => setInvoiceNumber(e.toUpperCase())} loading={loading} />
                        <Input label='Bairro' value={invoiceDistrit} onChangeText={e => setInvoiceDistrit(e.toUpperCase())} loading={loading} />
                        <Input label='Cidade' value={invoiceCity} onChangeText={e => setInvoiceCity(e.toUpperCase())} loading={loading} />
                        <Input label='Estado' value={invoiceState} onChangeText={e => setInvoiceState(e.toUpperCase())} loading={loading} />
                    </Form>
                }
                {currentStep == 2 &&
                    <Form
                        loading={loading}
                        title='Produtos / Serviços'
                        buttonHeader={<FormButtonHeader loading={loading} onPress={() => setModalVisible(true)} />}
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                    >
                        <View>
                            {Object.keys(listProducts).length > 0 && <HeaderListProducst options />}
                            {listProducts.map((product, index) => {
                                return <CardProduct product={product} key={index} options />
                            })}
                            {Object.keys(listProducts).length > 0 && <FooterListProducts total={listProducts.reduce((total, obj) => obj.total + total, 0)} />}
                        </View>
                    </Form>
                }
                {currentStep == 3 &&
                    <Form
                        loading={loading}
                        title='Revisar Nota'
                        handlePrevious={handlePrevious}
                        handleNext={handleNext}
                        textButtonNext='Finalizar'
                        colorButtonNext='green'
                    >
                        <View style={[styles.invoice, theme.shadow]}>
                            <View style={styles.formInfo}>
                                <Line left={invoiceName} />
                                <Line left={`${invoiceStreet}, ${invoiceNumber}`} />
                                <Line left={`${invoiceDistrit} - ${invoiceCity} / ${invoiceState}`} />
                                <Line left={invoiceTelephone} right={formattedCnpj(invoiceCnpj)} />
                            </View>
                            <View style={styles.formDate}>
                                <Line left={invoiceDate} />
                            </View>
                            {Object.keys(listProducts).length > 0 && <HeaderListProducst />}
                            {listProducts.map((product, index) => {
                                return <CardProduct product={product} key={index} />
                            })}
                            {Object.keys(listProducts).length > 0 && <FooterListProducts total={listProducts.reduce((total, obj) => obj.total + total, 0)} />}
                            <View style={styles.formDate}>
                                <Line left={`${vehicle?.model} - ${vehicle?.plate}`} />
                            </View>
                        </View>
                        <View style={styles.printContainer} />
                    </Form>
                }
            </Content>
            <Modal
                title='Produto ou Serviço'
                visible={modalVisible}
                loading={loading}
                buttonClose={{ text: 'Cancelar', onPress: handleCloseModal }}
                buttonConfirm={{ text: 'Adicionar', onPress: handleModalSaveProduct }}
            >
                <BodyModal>
                    <Input label='Descrição do Produto / Serviço' value={productName} onChangeText={e => setProductName(e.toUpperCase())} loading={loading} required />
                    <Input label='Quantidade' keyboardType='number-pad' value={productQuantity} onChangeText={setProductQuantity} loading={loading} required />
                    <Input label='Valor Unidade' keyboardType='number-pad' value={productValue} onChangeText={(masked, unmasked) => setProductValue(unmasked)} mask={CURRENCY_MASK} loading={loading} required />
                    <Input label='Desconto' keyboardType='number-pad' value={productDiscount} onChangeText={(masked, unmasked) => setProductDiscount(unmasked)} mask={CURRENCY_MASK} loading={loading} />
                    <Input label='Total' keyboardType='number-pad' value={productTotal} onChangeText={(masked, unmasked) => setProductTotal(unmasked)} mask={CURRENCY_MASK} loading={loading} required />

                    <CheckboxContainer label='Garantia ou próxima troca?'>
                        <Checkbox selected={productNextExchangeType == 'date'} label='Data' onPress={() => setProductNextExchangeType('date')} />
                        <Checkbox selected={productNextExchangeType == 'km'} label='Quilômetro (KM)' onPress={() => setProductNextExchangeType('km')} />
                    </CheckboxContainer>

                    {productNextExchangeType == 'date' &&
                        <Input label='Até quando é a garantia?' keyboardType='number-pad' value={productNextExchange} onChangeText={setProductNextExchange} mask={DATE_MASK} loading={loading} required />
                    }
                    {productNextExchangeType == 'km' &&
                        <Input label='Com quantos KM é a próxima troca?' keyboardType='number-pad' value={productNextExchange} onChangeText={setProductNextExchange} loading={loading} required />
                    }
                </BodyModal>
            </Modal>
        </Container>
    );
}

interface FormProps {
    loading: boolean;
    title: string;
    buttonHeader?: React.ReactNode;
    children: React.ReactNode;
    handlePrevious: () => void;
    textButtonPrevious?: string;
    handleNext: () => void;
    textButtonNext?: string;
    colorButtonNext?: 'blue' | 'green';
}

function Form({ loading, title, buttonHeader, children, handlePrevious, handleNext, textButtonPrevious = 'Voltar', textButtonNext = 'Continuar', colorButtonNext }: FormProps) {
    return (
        <View style={styles.form}>
            <View style={styles.formTitle}>
                <Text style={styles.title}>{title}</Text>
                {buttonHeader}
            </View>
            <View style={styles.formContent}>
                {children}
            </View>
            <View style={styles.formButtons}>
                <ButtonModal text={textButtonPrevious} loading={loading} onPress={handlePrevious} color='slate-gray' />
                <ButtonModal text={textButtonNext} loading={loading} onPress={handleNext} color={colorButtonNext} />
            </View>
        </View>
    )
}

interface FormButtonHeaderProps extends TouchableOpacityProps {
    loading: boolean;
}

function FormButtonHeader({ loading, ...props }: FormButtonHeaderProps) {
    return (
        <TouchableOpacity style={styles.button} {...props} disabled={loading}>
            <Plus color={theme.colors.white} weight='bold' />
        </TouchableOpacity>
    )
}

interface LineProps {
    left: string;
    right?: string;
}

function Line({ left, right = '' }: LineProps) {
    return (
        <View style={styles.line}>
            <Text style={styles.text}>{left.length > 3 && left.toUpperCase()}</Text>
            <Text style={styles.text}>{right.length > 3 && right.toUpperCase()}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        paddingVertical: 20
    },
    formTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 40,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.green
    },
    title: {
        fontSize: 22,
        fontWeight: '600'
    },
    formContent: {
        flex: 1,
        paddingVertical: 20,
        gap: 20,
    },
    formButtons: {
        flexDirection: 'row',
        gap: 20,
        paddingTop: 20
    },
    formInfo: {
        paddingBottom: 10,
        gap: 8,
    },
    formDate: {
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: theme.colors.black
    },
    line: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16
    },
    invoice: {
        marginHorizontal: 5,
        paddingHorizontal: 5,
        paddingTop: 20,
        paddingBottom: 90,
        backgroundColor: theme.colors.invoice,
        zIndex: 1,
    },
    printContainer: {
        marginTop: -30,
        width: '100%',
        height: 20,
        backgroundColor: theme.colors.black,
        zIndex: 0,
    }
})
