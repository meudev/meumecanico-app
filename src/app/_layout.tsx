import { AppRegistry } from 'react-native';
import { Slot } from 'expo-router';

import { expo } from '../../app.json';
import { AuthProvider } from '../context/auth';

export default function Root() {

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

AppRegistry.registerComponent(expo.name, () => Root);