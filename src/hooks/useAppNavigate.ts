import {NavigationProp, useNavigation} from '@react-navigation/native';

const useAppNavigate = <T extends object>() => {
  const navigation = useNavigation<NavigationProp<T>>();

  return navigation;
};

export default useAppNavigate;
