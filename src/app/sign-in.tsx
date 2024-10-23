import { useEffect, useLayoutEffect, useState } from 'react';
import { router, useFocusEffect } from 'expo-router';
import { StyleSheet, View, Image, Alert } from 'react-native';

import Button from '../components/Button';
import Input from '../components/Input';
import { Container, Content } from '../components/Container';
import { BodyModal, Modal } from '../components/Modal';

import { useAuth } from '../context/auth';
import { createUser } from '../database/offline/repository';
import { UserCreateInterface } from '../interfaces/UserInterface';
import { CPF_MASK } from '../types/input';
import { validateName, validateCpf } from '../hooks/validateForms';
import crypto from '../hooks/crypto';

export default function SignIn() {
  const { signIn, signInLocal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  async function handleLogin() {
    setLoading(true)
    const response = await signIn({ cpf, password })

    setLoading(false)
    return response && router.push('/list');
  }

  async function handleSaveNewAccount() {
    const body: UserCreateInterface = {
      name: name,
      cpf: cpf,
      password: await crypto(password)
    };

    if (!validateName(name)) return Alert.alert('Atenção', 'Nome inválido.');
    if (!validateCpf(cpf)) return Alert.alert('Atenção', 'CPF inválido.');
    if (password.length < 8) return Alert.alert('Atenção', 'Senha deve conter no mínimo 8 caracteres.');
    if (password != repeatPassword) return Alert.alert('Atenção', 'As senhas não foram digitas iguais.');

    setLoading(true)

    try {
      await createUser(body);
      setModalVisible(false)
      setLoading(false)
      return Alert.alert('Sucesso', 'Conta criada com sucesso.');
    } catch (error) {
      setLoading(false)
      return Alert.alert('Atenção', 'Falha ao criar a conta.');
    }
  }

  useEffect(() => {
    signInLocal()
  }, [])

  return (
    <Container>
      <Content>
        <Image style={styles.logo} source={require('../assets/logo.png')} />
        <View style={styles.content}>
          <Input label='CPF' loading={loading} onChangeText={(masked, unmasked) => setCpf(unmasked)} value={cpf} mask={CPF_MASK} />
          <Input label='Senha' loading={loading} onChangeText={setPassword} value={password} secureTextEntry />
          <Button text='Entrar' loading={loading} onPress={handleLogin} />
          <Button text='Criar Conta' loading={loading} onPress={() => setModalVisible(true)} type='secondary' />
        </View>
      </Content>
      <Modal
        title='Criar Conta'
        visible={modalVisible}
        loading={loading}
        buttonClose={{ text: 'Cancelar', onPress: () => setModalVisible(false) }}
        buttonConfirm={{ text: 'Criar', onPress: handleSaveNewAccount }}
      >
        <BodyModal>
          <Input label='Nome Completo' value={name} onChangeText={e => setName(e.toUpperCase())} loading={loading} required />
          <Input label='CPF' value={cpf} onChangeText={(masked, unmasked) => setCpf(unmasked)} loading={loading} mask={CPF_MASK} required />
          <Input label='Senha' value={password} onChangeText={setPassword} loading={loading} required secureTextEntry />
          <Input label='Repetir Senha' value={repeatPassword} onChangeText={setRepeatPassword} loading={loading} required secureTextEntry />
        </BodyModal>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '90%',
    objectFit: 'contain'
  },
  content: {
    width: '100%',
    gap: 10
  }
});
