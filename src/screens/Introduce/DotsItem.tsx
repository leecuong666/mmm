import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {dimension} from '../../contants/appInfo';
import {useTheme} from '@react-navigation/native';

interface Props {
  offset: SharedValue<number>;
  index: number;
  itemWidth: number;
}

const dotSize = dimension.width * 0.025;

const DotsItem = ({offset, index, itemWidth}: Props) => {
  const {
    colors: {card},
  } = useTheme();

  const highlight = useDerivedValue(() => offset.value / itemWidth);

  const dotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      highlight.value,
      [index - 1, index, index + 1],
      [`${card}35`, card, `${card}35`],
    ),
  }));

  return <Animated.View style={[styles.container, dotStyle]} />;
};

export default DotsItem;

const styles = StyleSheet.create({
  container: {
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
  },
});
