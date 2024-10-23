import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { router, useNavigation } from "expo-router";
import { Plus } from "phosphor-react-native";

import { Container, Content } from "../../../components/Container";
import { ButtonHeader, Header } from "../../../components/Header";
import { BodyModal, Modal } from "../../../components/Modal";
import CardVehicle from "../../../components/Card/Vehicle";
import Input from "../../../components/Input";
import { useAuth } from "../../../context/auth";
import Empty from "../../../components/Empty";

import { VehicleCreateInterface, VehicleInterface } from "../../../interfaces/VehicleInterface";
import { createVehicle, listVehicles } from "../../../database/offline/repository";
import { CAR_PLATE } from "../../../types/input";
import { validatePlate } from "../../../hooks/validateForms";

export default function ListVehicles() {
  const navigation = useNavigation();
  const { user, setVehicle, signOut } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false)
  const [vehicles, setVehicles] = useState<VehicleInterface[]>([])

  const [plate, setPlate] = useState('')
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [km, setKm] = useState('')
  const [year, setYear] = useState('')
  const [fuel, setFuel] = useState('')

  async function handleSaveNewVehicle() {
    const body: VehicleCreateInterface = {
      idUser: String(user?.id),
      plate,
      brand,
      model,
      color,
      km,
      year,
      fuel,
    }

    if (validatePlate(plate)) return Alert.alert('Atenção', 'Placa inválida.')
    if (brand.length < 2) return Alert.alert('Atenção', 'Marca inválida.')
    if (model.length < 2) return Alert.alert('Atenção', 'Modelo inválido.')
    if (color.length < 2) return Alert.alert('Atenção', 'Cor inválida.')

    setLoading(true)

    try {
      await createVehicle(body);
      setModalVisible(false)
      setLoading(false)
      return Alert.alert('Sucesso', 'Veículo cadastrado com sucesso.');
    } catch (error) {
      setLoading(false)
      return Alert.alert('Atenção', 'Falha ao cadastrar o veículo.');
    }
  }

  function handleSelectedVehicle(vehicle: any) {
    setVehicle(vehicle)
    router.push('(tabs)')
  }

  async function loadVehicles() {
    const response = await listVehicles(user?.id!);

    setVehicles(response)
  }

  useEffect(() => {
    loadVehicles()
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
      signOut()
    });
  }, [])

  return (
    <Container>
      <Header title='Selecione um veículo' >
        <ButtonHeader icon={<Plus />} onPress={() => setModalVisible(true)} />
      </Header>
      <Content>
        {user != null &&
          <>
            {Object.keys(vehicles).length > 0 ?
              <>
                {vehicles.map((vehicle, index) => {
                  return <CardVehicle
                    plate={vehicle.plate}
                    brand={vehicle.brand}
                    model={vehicle.model}
                    color={vehicle.color}
                    km={vehicle.km}
                    onPress={() => handleSelectedVehicle(vehicle)}
                    key={index}
                  />
                })}
              </>
              :
              <Empty text="Nenhum veículo cadastrado" />
            }
          </>
        }
      </Content>
      <Modal
        title='Cadastrar veículo'
        visible={modalVisible}
        loading={loading}
        buttonClose={{ text: 'Cancelar', onPress: () => setModalVisible(false) }}
        buttonConfirm={{ text: 'Cadastrar', onPress: handleSaveNewVehicle }}
      >
        <BodyModal>
          <Input label='Placa' value={plate} onChangeText={(masked, unmasked) => setPlate(unmasked.toUpperCase())} loading={loading} mask={CAR_PLATE} required />
          <Input label='Marca' value={brand} onChangeText={(masked, unmasked) => setBrand(unmasked.toUpperCase())} loading={loading} required />
          <Input label='Modelo' value={model} onChangeText={(masked, unmasked) => setModel(unmasked.toUpperCase())} loading={loading} required />
          <Input label='Cor' value={color} onChangeText={(masked, unmasked) => setColor(unmasked.toUpperCase())} loading={loading} required />
          <Input label='Ano Modelo' value={year} onChangeText={setYear} loading={loading} />
          <Input label='Combustível' value={fuel} onChangeText={(masked, unmasked) => setFuel(unmasked.toUpperCase())} loading={loading} />
          <Input label='KM Atual' value={km} onChangeText={setKm} loading={loading} />
        </BodyModal>
      </Modal>
    </Container>
  )
}