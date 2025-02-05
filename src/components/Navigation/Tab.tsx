import {Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {fonts} from '../../contants/fonts';
import {dimension} from '../../contants/appInfo';
import {RootBottomTabsParams} from '../../navigation/types';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Bell} from 'lucide-react-native';
import {colors} from '../../contants/color';
import {Home} from '../../contants/svgs';

interface Props {
  isFocus: boolean;
  label: keyof RootBottomTabsParams;
  onPress: () => void;
}

const {tabH} = dimension;
const iconSize = tabH * 0.4;

const Tab = ({isFocus, label, onPress}: Props) => {
  const focus = useDerivedValue(
    () => withTiming(Number(isFocus), {duration: 300}),
    [isFocus],
  );
  const focusColor = isFocus ? colors.darkBg : colors.inactTextYellow;

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      focus.value,
      [0, 1],
      [colors.inactTextYellow, colors.darkBg],
    ),
  }));

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {label === 'Home' ? (
        <Home width={iconSize} height={iconSize} stroke={focusColor} />
      ) : (
        <Bell size={iconSize} color={focusColor} />
      )}

      <Animated.Text style={[styles.label, textStyle]}>{label}</Animated.Text>
    </Pressable>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    overflow: 'hidden',
  },

  label: {
    fontFamily: fonts.medium,
    fontSize: tabH * 0.2,
  },
});
