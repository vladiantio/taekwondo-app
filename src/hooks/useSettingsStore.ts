import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  showMovementName: boolean;
  showNameInKorean: boolean;
  pauseBetweenMovements: boolean;
  loopVideo: boolean;
  setSettings: (settings: Partial<SettingsState>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      showMovementName: true,
      showNameInKorean: false,
      pauseBetweenMovements: false,
      loopVideo: false,
      setSettings: (settings: Partial<SettingsState>) =>
        set((state) => ({ ...state, ...settings })),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
