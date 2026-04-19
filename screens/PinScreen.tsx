import { useHubStore } from '@/store/useHubStore';
import { Fingerprint, ShieldCheck } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function PinScreen() {
  const { unlockWithPin, unlockWithBiometrics, pinLength } = useHubStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const tryBio = async () => {
      await unlockWithBiometrics();
    };

    tryBio();
  }, [unlockWithBiometrics]);

  const handleKeyPress = async (digit: string) => {
    if (pin.length >= pinLength) return;

    const next = `${pin}${digit}`;
    setPin(next);
    setError('');

    if (next.length === pinLength) {
      const ok = await unlockWithPin(next);
      if (!ok) {
        setError('Wrong PIN. Try again.');
        setPin('');
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <View className="flex-1 items-center justify-center bg-[#050505] px-6">
      <View className="mb-8 items-center">
        <ShieldCheck size={40} color="#ef4444" />
        <Text className="mt-4 text-2xl font-extrabold text-zinc-100">Ultra X Hub 3.0</Text>
        <Text className="mt-2 text-center text-zinc-400">Enter your 4-digit PIN to continue</Text>
      </View>

      <View className="mb-6 flex-row gap-3">
        {Array.from({ length: pinLength }).map((_, index) => {
          const filled = index < pin.length;
          return <View key={index} className={`h-4 w-4 rounded-full ${filled ? 'bg-rose-500' : 'bg-zinc-700'}`} />;
        })}
      </View>

      {!!error && <Text className="mb-4 text-red-400">{error}</Text>}

      <View className="w-full max-w-xs flex-row flex-wrap justify-center gap-3">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
          <Pressable
            key={digit}
            onPress={() => handleKeyPress(digit)}
            className="h-16 w-[30%] items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900"
          >
            <Text className="text-xl font-semibold text-zinc-100">{digit}</Text>
          </Pressable>
        ))}
      </View>

      <View className="mt-4 flex-row gap-3">
        <Pressable
          onPress={handleDelete}
          className="rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3"
        >
          <Text className="text-zinc-200">Delete</Text>
        </Pressable>

        <Pressable
          onPress={unlockWithBiometrics}
          className="flex-row items-center rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3"
        >
          <Fingerprint size={18} color="#ef4444" />
          <Text className="ml-2 text-zinc-200">Biometric</Text>
        </Pressable>
      </View>

      <Text className="mt-6 text-xs text-zinc-500">Default PIN for first run: 1234</Text>
    </View>
  );
}
