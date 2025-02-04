import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from './types';
import RootBottomTabs from './RootBottomTabs';
import Introduce from '../screens/Introduce';
import SignIn from '../screens/SignIn';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Splash'}
      screenOptions={{
        headerShown: false,
        freezeOnBlur: true,
        animation: 'fade',
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Introduce" component={Introduce} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="BottomTabs" component={RootBottomTabs} />
    </Stack.Navigator>
  );
};

export default RootStack;
