import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { ArrowsCounterClockwise, BellRinging, CloudArrowUp, IconContext, Info, Lifebuoy, RocketLaunch, SignOut, UserFocus, UserSquare, X } from 'phosphor-react-native';

import { Container, Content } from '../../../../components/Container';
import { Header } from '../../../../components/Header';

import { useAuth } from '../../../../context/auth';
import { theme } from '../../../../theme';

export default function Settings() {
  const { user, setVehicle, signOut } = useAuth()

  return (
    <Container>
      <Header title='Conta' />
      <Content>
        <View style={styles.container}>
          <View style={styles.containerPhoto}>

          </View>
          <Text style={styles.title}>{user?.name}</Text>
          <View style={styles.containerMenu}>
            <Menu icon={<UserSquare />} text='Meus Dados' />
            <MenuLine />
            <Menu icon={<ArrowsCounterClockwise />} text='Trocar Veículo' onPress={() => setVehicle(null)}/>
            <MenuLine />
            <Menu icon={<BellRinging />} text='Notificações' />
            <MenuLine />
            <Menu icon={<CloudArrowUp />} text='Sincronizar' />
            <MenuLine />
            <Menu icon={<RocketLaunch />} text='Upgrade' />
            <MenuLine />
            <Menu icon={<Lifebuoy />} text='Ajuda' />
            <MenuLine />
            <Menu icon={<Info />} text='Sobre' />
            <MenuLine />
            <Menu icon={<SignOut />} text='Sair' onPress={signOut}/>
          </View>
        </View>
      </Content>
    </Container>
  );
}

interface MenuProps extends TouchableOpacityProps {
  text: string;
  icon: any;
}

const Menu = (props: MenuProps ) => {
  return (
    <TouchableOpacity style={styles.menu} {...props}>
            <IconContext.Provider
                value={{
                    color: theme.colors.black,
                    size: 22,
                    weight: 'bold',
                }}
            >
                {props.icon}
            </IconContext.Provider>
      <Text style={styles.textMenu}>{props.text.toUpperCase()}</Text>
    </TouchableOpacity>
  )
}

const MenuLine = () => {
  return <View style={styles.lineMenu} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 30
  },
  containerPhoto: {
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: theme.colors.blue
  },
  title: {
    fontSize: 20,
    fontWeight: '600'
  },
  containerMenu: {
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: theme.colors.gray
  },
  menu: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    height: 60,
    gap: 20,
    paddingHorizontal: 20,
  },
  lineMenu: {
    width: '100%',
    height: 1,
    backgroundColor: theme.colors.gray
  },
  textMenu: {
    fontSize: 18
  }
})