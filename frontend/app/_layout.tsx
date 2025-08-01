import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { ThemeProvider } from '@/contexts/ThemeContext';
import NotificationManager from '@/components/NotificationManager';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <NotificationManager>
        <>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </>
      </NotificationManager>
    </ThemeProvider>
  );
}
