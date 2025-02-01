import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import {UserInfoType} from '../types/auth';
import {zustandStorage} from './initMMKVStorage';

interface AuthenStore {
  user: UserInfoType | null;
  initUser: (user: UserInfoType) => void;
}

const useAuthenStore = create<AuthenStore>()(
  persist(
    set => ({
      user: null,

      initUser: user => set(() => ({user: user})),
      removeUser: () => set(() => ({user: null})),
    }),
    {
      name: 'authenStore',
      storage: zustandStorage,
    },
  ),
);

export default useAuthenStore;
