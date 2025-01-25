import {NavigationContainer} from '@react-navigation/native';
import RootStack from './RootStack';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
