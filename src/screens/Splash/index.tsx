import {useEffect} from 'react';
import useAppGlobal from '../../hooks/useAppGlobal';
import useAppNavigate from '../../hooks/useAppNavigate';
import {RootStackParams} from '../../navigation/types';
import {useTheme} from '@react-navigation/native';
import {useAppSelector} from '../../hooks/reduxHooks';

const Splash = () => {
  const {showLoading} = useAppGlobal();
  const {
    colors: {background, text},
  } = useTheme();
  const navigation = useAppNavigate<RootStackParams>();
  const {id} = useAppSelector(state => state.authen.user);
  const {isShowIntroduce} = useAppSelector(state => state.appState);

  useEffect(() => {
    showLoading(true, {
      bgColor: background,
      text: 'Manager My Money',
      textColor: text,
      textFont: require('../../assets/fonts/MazzardM-SemiBold.otf'),
      duration: 1666,
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
