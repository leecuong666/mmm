import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {dimension} from '../../contants/appInfo';
import {colors} from '../../contants/color';

interface Props {
  offset: number;
  index: number;
  stepSize: number;
}

const dotSize = dimension.width * 0.025;

const DotsItem = ({offset, index, stepSize}: Props) => {
  const highlight = useDerivedValue(
    () => withTiming(offset / stepSize, {duration: 100}),
    [offset],
  );

  const dotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      highlight.value,
      [index - 1, index, index + 1],
      ['#e7e9f1', colors.main2, '#e7e9f1'],
    ),
  }));

  return <Animated.View style={[styles.container, dotStyle]}></Animated.View>;
};

export default DotsItem;

const styles = StyleSheet.create({
  container: {
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
  },
});
