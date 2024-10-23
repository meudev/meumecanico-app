import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import {  PencilSimple } from "phosphor-react-native";

import { ButtonHeader, Header } from "../../../../components/Header";
import { Container } from "../../../../components/Container";
import { Plate } from "../../../../components/Vehicle/Plate";

import { useAuth } from "../../../../context/auth";
import { theme } from "../../../../theme";

export default function VehicleView() {
  const { vehicle } = useAuth();

  return (
    <Container>
      <Header title="Informações">
        <ButtonHeader icon={<PencilSimple />} onPress={() => {}} color="blue" />
      </Header>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.contentPhoto}>
          <Image style={styles.photo} source={require('../../../../assets/icon-vehicle.png')} />
        </View>
        <View style={[styles.contentInfo, theme.shadow]}>
          <Plate text={`${vehicle?.plate}`} />
          <Line label="Marca:" text={`${vehicle?.brand}`} />
          <Line label="Modelo:" text={`${vehicle?.model}`} />
          <Line label="Cor:" text={`${vehicle?.color}`} />
          <Line label="Ano:" text={`${vehicle?.color}`} />
          <Line label="Combustível:" text={`${vehicle?.plate}`} />
          <Line label="Km Atual:" text={`${vehicle?.km}`} />
        </View>
      </ScrollView>
    </Container>
  )
}

interface LineProps {
  label: string;
  text: string | number;
}

function Line({ label, text }: LineProps) {
  return (
    <View style={styles.line}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 16,
    gap: 15,
  },
  contentPhoto: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  photo: {
    height: 100,
    objectFit: 'contain'
  },
  contentInfo: {
    marginTop: 20,
    paddingTop: 40,
    width: '100%',
    padding: 16,
    borderRadius: 8,
    gap: 20,
    backgroundColor: theme.colors.background
  },
  label: {
    fontSize: 12,
    color: theme.colors.text
  },
  text: {
    fontSize: 20,
    color: theme.colors.black
  },
  line: {
    height: 45,
    gap: 5
  },
});