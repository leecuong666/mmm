import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {dimension} from '../../contants/appInfo';
import {useTheme} from '@react-navigation/native';

interface Props {
  offset: number;
  index: number;
}

const dotSize = dimension.width * 0.025;

const DotsItem = ({offset, index}: Props) => {
  const {
    colors: {card},
  } = useTheme();

  const highlight = useDerivedValue(
    () => withTiming(offset, {duration: 100}),
    [offset],
  );

  const dotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      highlight.value,
      [index - 1, index, index + 1],
      [`${card}35`, card, `${card}35`],
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
