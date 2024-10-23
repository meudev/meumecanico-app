import { Tabs } from 'expo-router';
import { SquaresFour, Wrench, CarSimple, User } from 'phosphor-react-native';

import { theme } from '../../../theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.white,
        tabBarInactiveTintColor: theme.colors.white,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.blue
        },
      }}
      sceneContainerStyle={{
        backgroundColor: theme.colors.white
      }}
    >
      <Tabs.Screen name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, focused }) => <SquaresFour size={24} color={color} weight={focused ? 'fill' : 'regular'} />,
        }}
      />
      <Tabs.Screen name="vehicle/index"
        options={{
          title: 'Veículo',
          tabBarIcon: ({ color, focused }) => <CarSimple size={24} color={color} weight={focused ? 'fill' : 'regular'} />,
        }}
      />
      <Tabs.Screen name="services/index"
        options={{
          title: 'Serviços',
          tabBarIcon: ({ color, focused }) => <Wrench size={24} color={color} weight={focused ? 'fill' : 'regular'} />,
        }}
      />
      <Tabs.Screen name="settings/index"
        options={{
          title: 'Conta',
          tabBarIcon: ({ color, focused }) => <User size={28} color={color} weight={focused ? 'fill' : 'regular'} />,
        }}
      />
    </Tabs>
  );
}
