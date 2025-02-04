import React, {createContext, useState} from 'react';
import Notification from './Notification';
import LogoLoading from './LogoLoading';
import {DataSourceParam} from '@shopify/react-native-skia';

export type NotifiType = 'success' | 'error' | 'warning';
export type NotifiPos = 'top' | 'bottom';

export interface Notifi {
  id?: string;
  message: string;
  type: NotifiType;
  onAnimationEnd?: (isEnd: boolean) => void;
}

export interface Loading {
  bgColor?: string;
  isVisable?: boolean;
  fontSize?: number;
  text?: string;
  textColor?: string;
  textFont?: DataSourceParam;
  duration?: number;
  time?: number;
  onAnimationEnd?: (isEnd: boolean) => void;
}

export interface AppContextProps {
  showNotification: (notifi: Notifi) => void;
  showLoading: (state: boolean, props?: Loading) => void;
}

export const AppContext = createContext<AppContextProps>({
  showNotification(notifi) {},
  showLoading(state) {},
});

const initLoading: Loading = {
  bgColor: 'rgba(0,0,0,0.6)',
  isVisable: false,
  fontSize: 30,
  text: 'loading',
};

const AppComProvider = ({children}: {children: React.ReactNode}) => {
  const [loadingProps, setLoadingProps] = useState<Loading>(initLoading);
  const [notifi, setNotifi] = useState<Notifi | null>(null);

  const showNotification = (alert: Notifi) => {
    setNotifi({
      ...alert,
      id: `${Math.random}${Date.now()}`,
      onAnimationEnd(isEnd) {
        if (isEnd) setNotifi(null);
      },
    });
  };

  const showLoading = (state: boolean, props: Loading = loadingProps) => {
    setLoadingProps({
      ...props,
      isVisable: state,
    });
  };

  return (
    <AppContext.Provider value={{showNotification, showLoading}}>
      {children}

      <Notification {...notifi!} />

      <LogoLoading {...loadingProps} />
    </AppContext.Provider>
  );
};

export default AppComProvider;
