import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const dimension = {
  width,
  height,
  pH: width * 0.06,
};
