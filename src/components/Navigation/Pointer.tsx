import {StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {dimension} from '../../contants/appInfo';
import {colors} from '../../contants/color';

interface Props {
  index: number;
  space: number;
  amount: number;
}

const {tabW, tabH} = dimension;

const pointW = tabW * 0.06;
const pointH = tabH * 0.055;

const Pointer = ({index, space, amount}: Props) => {
  const initPos = useDerivedValue(() => {
    const posW = (tabW - space) / amount;
    const firstPos = posW / 2 - pointW / 2;
    const secondPos = tabW - posW / 2 - pointW / 2;
    return withTiming(firstPos + index * (secondPos - firstPos), {
      duration: 333,
    });
  }, [index]);

  const posStyle = useAnimatedStyle(() => ({
    transform: [{translateX: initPos.value}],
  }));

  return <Animated.View style={[styles.container, posStyle]} />;
};

export default Pointer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: pointW,
    height: pointH,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: colors.darkBg,
    bottom: 0,
  },
});
