import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import RootStack from './RootStack';
import {colors} from '../contants/color';
import useAppStore from '../zustand/appStore';

const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: colors.lightPrimary,
    background: colors.lightBg,
    card: colors.darkCard,
    text: colors.darkText,
    border: colors.darkBorder,
    notification: colors.darkNotifi,
  },
};

const darkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: colors.darkPrimary,
    background: colors.darkBg,
    card: colors.lightCard,
    text: colors.lightText,
    border: colors.lightBorder,
    notification: colors.lightNotifi,
  },
};

const RootNavigation = () => {
  const {isDarkMode} = useAppStore();

  return (
    <NavigationContainer theme={isDarkMode ? darkTheme : lightTheme}>
      <RootStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
