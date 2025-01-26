import {
  DefaultTheme,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import RootStack from './RootStack';
import {colors} from '../contants/color';
import {useAppSelector} from '../hooks/reduxHooks';
import BootSplash from 'react-native-bootsplash';

const lightTheme: Theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: colors.main1,
    card: colors.main2,
    text: colors.text1,
    border: colors.main2,
    notification: 'rgb(255, 69, 58)',
  },
};

const darkTheme: Theme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    primary: colors.main1,
    background: colors.main2,
    card: colors.main3,
    text: colors.text3,
    border: colors.main2,
    notification: colors.main2,
  },
};

const RootNavigation = () => {
  const {isDarkMode} = useAppSelector(state => state.appState);

  return (
    <NavigationContainer
      theme={isDarkMode ? darkTheme : lightTheme}
      onReady={() => {
        BootSplash.hide({fade: true});
      }}>
      <RootStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
