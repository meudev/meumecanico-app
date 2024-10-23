import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'phosphor-react-native';

import { Container, Content } from '../../../../components/Container';
import { ButtonHeader, Header } from '../../../../components/Header';
import { listInvoice } from '../../../../database/offline/repository';
import { useAuth } from '../../../../context/auth';
import { InvoiceInterface } from '../../../../interfaces/InvoiceInterface';
import { theme } from '../../../../theme';
import { formattedAmount } from '../../../../hooks/converter';
import { CardProduct, HeaderListProducst } from '../../../../components/Card/Invoce';
import NotFound from '../../../../components/NotFound';

export default function Services() {
  const { user, vehicle } = useAuth();
  const [listInvoices, setListInvoices] = useState<InvoiceInterface[]>([]);

  async function loadListServices() {
    const invoces = await listInvoice(user?.id!, vehicle?.id!);
    setListInvoices(invoces)
  }

  useEffect(() => {
    loadListServices()
  }, [])

  return (
    <Container>
      <Header title='Serviços' >
        <ButtonHeader icon={<Plus />} onPress={() => router.push('/newService')} />
      </Header>
      <Content>
        <View style={styles.container}>
          {Object.keys(listInvoices).length == 0 ?
            <NotFound text='Nenhum serviço cadastrado.' />
            :
            <>
              {listInvoices.map((invoice, index) => {
                return <Invoice invoice={invoice} key={index} />
              })}
            </>
          }
        </View>
      </Content>
    </Container>
  );
}

interface InvoiceProps {
  invoice: InvoiceInterface;
}

function Invoice({ invoice }: InvoiceProps) {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.containerInvoice}>
      <TouchableOpacity style={[styles.content, theme.shadow]} onPress={() => setOpen(!open)}>
        <View style={styles.line}>
          <Text style={styles.title}>{invoice.date}</Text>
          <Text style={styles.title}>R$ {formattedAmount(invoice.products.reduce((total, obj) => obj.total + total, 0))}</Text>
        </View>
        <Text style={styles.text}>{invoice.name.toUpperCase()}</Text>
      </TouchableOpacity>
      {open &&
        <View style={[styles.contentInvoice, theme.shadow]}>
          <HeaderListProducst />
          {invoice.products.map((product, index) => {
            return <CardProduct product={product} key={index} />
          })}
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20
  },
  containerInvoice: {

  },
  content: {
    borderRadius: 5,
    padding: 16,
    gap: 10,
    backgroundColor: theme.colors.invoice,
    zIndex: 2
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    fontWeight: '700'
  },
  text: {
    fontSize: 18,
  },
  contentInvoice: {
    marginHorizontal: 10,
    padding: 16,
    borderRadius: 5,
    backgroundColor: theme.colors.invoice,
    zIndex: 1
  }
})