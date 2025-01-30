import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import useAppGlobal from '../../hooks/useAppGlobal';
import useAppNavigate from '../../hooks/useAppNavigate';
import {RootStackParams} from '../../navigation/types';
import {useTheme} from '@react-navigation/native';

const Splash = () => {
  const {showLoading} = useAppGlobal();
  const {
    colors: {background, text},
  } = useTheme();
  const navigation = useAppNavigate<RootStackParams>();

  useEffect(() => {
    showLoading(true, {
      bgColor: background,
      text: 'Manager My Money',
      textColor: text,
      textFont: require('../../assets/fonts/MazzardM-SemiBold.otf'),
      duration: 1666,
      time: 1,
      onAnimationEnd(isEnd) {
        if (isEnd) {
          showLoading(false);
          return navigation.navigate('Introduce');
        }
      },
    });
  }, []);

  return <View style={styles.container} />;
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
