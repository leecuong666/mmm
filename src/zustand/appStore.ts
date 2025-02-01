import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {zustandStorage} from './initMMKVStorage';
import {AppState} from '../types/appState';
import {Appearance} from 'react-native';

interface AppStore extends AppState {
  updateIntroduceState: () => void;
  updateDarkMode: (state: boolean) => void;
}

const useAppStore = create<AppStore>()(
  persist(
    set => ({
      isShowIntroduce: true,
      isDarkMode: Appearance.getColorScheme() === 'dark',

      updateIntroduceState: () => set(() => ({isShowIntroduce: false})),
      updateDarkMode: isDark => set(() => ({isDarkMode: isDark})),
    }),
    {name: 'appStore', storage: zustandStorage},
  ),
);

export default useAppStore;
