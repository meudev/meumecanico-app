import { StyleSheet, Text, View } from 'react-native';

import { Container, Content } from '../../../components/Container';
import { CardUpdateKm } from '../../../components/Card/UpdateKm';

import { useAuth } from '../../../context/auth';
import Button from '../../../components/Button';

export default function App() {
  const { user, vehicle, setVehicle } = useAuth()
  return (
    <Container>
      <View style={styles.header}>
        <Text style={styles.title}>Olá, {user?.name}</Text>
      </View>
      <Content>
        <View style={styles.contentKm}>
          {vehicle?.id && <CardUpdateKm idVehicle={vehicle.id} nameVehicle={vehicle.model} plate={vehicle.plate} />}
        </View>
        <Button text='Trocar de veículo' onPress={() => setVehicle(null)} loading={false} />
      </Content>
    </Container>
  );
}


const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '500'
  },
  contentKm: {
    gap: 10
  }
})

