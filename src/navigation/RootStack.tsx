import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParams} from './types';
import RootBottomTabs from './RootBottomTabs';
import Introduce from '../screens/Introduce';
import SignIn from '../screens/SignIn';
import {useAppSelector} from '../hooks/reduxHooks';

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStack = () => {
  const {isShowIntroduce} = useAppSelector(state => state.appState);

  return (
    <Stack.Navigator
      initialRouteName={isShowIntroduce ? 'Introduce' : 'SignIn'}
      screenOptions={{headerShown: false, freezeOnBlur: true}}>
      <Stack.Screen name="Introduce" component={Introduce} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="BottomTabs" component={RootBottomTabs} />
    </Stack.Navigator>
  );
};

export default RootStack;
