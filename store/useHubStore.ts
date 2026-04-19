import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

const PIN_KEY = 'ultra_x_hub_pin';
const FAVORITES_KEY = 'ultra_x_hub_favorites';

type HubStore = {
  isHydrated: boolean;
  isUnlocked: boolean;
  pinLength: number;
  searchQuery: string;
  favorites: string[];
  hydrate: () => Promise<void>;
  setSearchQuery: (value: string) => void;
  toggleFavorite: (siteId: string) => Promise<void>;
  unlockWithPin: (pin: string) => Promise<boolean>;
  unlockWithBiometrics: () => Promise<boolean>;
  lockApp: () => void;
};

export const useHubStore = create<HubStore>((set, get) => ({
  isHydrated: false,
  isUnlocked: false,
  pinLength: 4,
  searchQuery: '',
  favorites: [],

  hydrate: async () => {
    try {
      const savedFavorites = await SecureStore.getItemAsync(FAVORITES_KEY);
      set({ favorites: savedFavorites ? JSON.parse(savedFavorites) : [] });

      const existingPin = await SecureStore.getItemAsync(PIN_KEY);
      if (!existingPin) {
        await SecureStore.setItemAsync(PIN_KEY, '1234');
      }
    } finally {
      set({ isHydrated: true });
    }
  },

  setSearchQuery: (value) => set({ searchQuery: value }),

  toggleFavorite: async (siteId) => {
    const current = get().favorites;
    const next = current.includes(siteId)
      ? current.filter((id) => id !== siteId)
      : [...current, siteId];

    set({ favorites: next });
    await SecureStore.setItemAsync(FAVORITES_KEY, JSON.stringify(next));
  },

  unlockWithPin: async (pin) => {
    const savedPin = await SecureStore.getItemAsync(PIN_KEY);
    const isValid = pin === (savedPin ?? '1234');
    if (isValid) {
      set({ isUnlocked: true });
    }
    return isValid;
  },

  unlockWithBiometrics: async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !enrolled) return false;

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Unlock Ultra X Hub 3.0',
      fallbackLabel: 'Use PIN instead',
      cancelLabel: 'Cancel',
      disableDeviceFallback: false,
    });

    if (result.success) {
      set({ isUnlocked: true });
      return true;
    }

    return false;
  },

  lockApp: () => set({ isUnlocked: false }),
}));
