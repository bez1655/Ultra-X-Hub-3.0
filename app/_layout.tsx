import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useHubStore } from '@/store/useHubStore';
import '../global.css';

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { hydrate, isHydrated, isUnlocked } = useHubStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!isHydrated) return;

    const inPin = segments[0] === 'pin';

    if (!isUnlocked && !inPin) {
      router.replace('/pin');
      return;
    }

    if (isUnlocked && inPin) {
      router.replace('/(tabs)/home');
    }
  }, [isHydrated, isUnlocked, segments, router]);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#050505' },
          headerTintColor: '#F5F5F5',
          contentStyle: { backgroundColor: '#050505' },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="pin" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="webview" options={{ title: 'Site Viewer' }} />
      </Stack>
    </>
  );
}
