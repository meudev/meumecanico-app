import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../database/offline/repository';

import { UserInterface } from '../interfaces/UserInterface';
import { VehicleInterface } from '../interfaces/VehicleInterface';
import { router } from 'expo-router';

interface ICredentials {
  cpf: string;
  password: string;
  // tokenFirebase: string;
}

interface AuthContextData {
  user: UserInterface | null;
  vehicle: VehicleInterface | null;
  setVehicle: React.Dispatch<React.SetStateAction<VehicleInterface | null>>;
  signIn: (credentials: ICredentials) => Promise<boolean>;
  signInLocal: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

function useAuth(): AuthContextData {
  return useContext(AuthContext)
}

function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [vehicle, setVehicle] = useState<VehicleInterface | null>(null);

  async function signIn({ cpf, password }: ICredentials) {
    if (cpf.length == 0) return false

    const user = await loginUser(cpf, password)

    if (!user?.id) return false

    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user)
    return true
  }

  async function signOut() {
    AsyncStorage.removeItem('user');
    setUser(null)
    setVehicle(null)
  }

  useEffect(() => {
    if (!vehicle) return router.replace('/list');
  }, [vehicle])

  async function signInLocal() {
    const userString = await AsyncStorage.getItem('user');

    if (userString == null) return

    const user: UserInterface = JSON.parse(userString)

    if(user.id) {
      setUser(user)
      return router.replace('/list');
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signInLocal, signOut, user, vehicle, setVehicle }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, useAuth }