import {useEffect} from 'react';
import useAppGlobal from '../../hooks/useAppGlobal';
import useAppNavigate from '../../hooks/useAppNavigate';
import {RootStackParams} from '../../navigation/types';
import {useTheme} from '@react-navigation/native';
import useAuthenStore from '../../zustand/authenStore';
import useAppStore from '../../zustand/appStore';

const Splash = () => {
  const {showLoading} = useAppGlobal();
  const {
    colors: {background, text},
  } = useTheme();
  const navigation = useAppNavigate<RootStackParams>();
  const {isShowIntroduce} = useAppStore();
  const id = useAuthenStore(state => state.user?.id);

  useEffect(() => {
    showLoading(true, {
      bgColor: background,
      text: 'Manager My Money',
      textColor: text,
      textFont: require('../../assets/fonts/MazzardM-SemiBold.otf'),
      duration: 1500,
      time: 1,
      onAnimationEnd(isEnd) {
        if (isEnd) showLoading(false);

        if (id) return navigation.navigate('BottomTabs');

        if (isShowIntroduce) return navigation.navigate('Introduce');

        return navigation.navigate('SignIn');
      },
    });
  }, []);

  return null;
};

export default Splash;
