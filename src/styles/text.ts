import {StyleSheet} from 'react-native';
import {fonts} from '../contants/fonts';
import {dimension} from '../contants/appInfo';

export const textStyle = StyleSheet.create({
  title: {
    fontFamily: fonts.semiBold,
    fontSize: dimension.width * 0.07,
  },

  content: {
    fontFamily: fonts.regular,
    fontSize: dimension.width * 0.042,
  },
});
