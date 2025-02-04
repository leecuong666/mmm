import React from 'react';
import {PressAnimate} from './Reanimated';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {FadeIn, FadeOut} from 'react-native-reanimated';
import {colors} from '../../contants/color';

interface Props {
  display?: boolean;
  bgColor?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  onPress?: () => void;
}

const Backdrop = ({
  display = false,
  bgColor = colors.backdrop,
  style,
  children,
  duration = 500,
  onPress,
}: Props) => {
  if (!display) return null;

  return (
    <PressAnimate
      onPress={onPress}
      entering={FadeIn.duration(duration)}
      exiting={FadeOut.duration(duration)}
      style={[
        StyleSheet.absoluteFillObject,
        style,
        {backgroundColor: bgColor},
      ]}>
      {children}
    </PressAnimate>
  );
};

export default Backdrop;
