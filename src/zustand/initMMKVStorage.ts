import {StateStorage, createJSONStorage} from 'zustand/middleware';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const zustandStorage = createJSONStorage(() => ({
  setItem: (name, value) => {
    return storage.set(name, value);
  },
  getItem: name => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return storage.delete(name);
  },
}));
