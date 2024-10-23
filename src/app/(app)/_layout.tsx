import { Redirect, Stack } from 'expo-router';

import { useAuth } from '../../context/auth';

import { theme } from '../../theme';

export default function AppLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.white }
      }}
    />
  )
}
