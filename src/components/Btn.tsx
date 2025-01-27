import {Pressable, StyleProp, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';

interface BtnAnimatedProps {
  style?: StyleProp<ViewStyle>;
  bgColor?: string;
  isShow?: boolean;
  disable?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const PressAnimated = Animated.createAnimatedComponent(Pressable);

const BtnAnimated = ({
  style,
  bgColor,
  disable = false,
  isShow = true,
  onPress,
  children,
}: BtnAnimatedProps) => {
  const display = useDerivedValue(
    () => withTiming(Number(isShow), {duration: 150}),
    [isShow],
  );
  const backgroundColor = useDerivedValue(
    () => withTiming(bgColor!, {duration: 300}),
    [bgColor],
  );

  const btnStyle = useAnimatedStyle(() => ({
    opacity: display.value,
    backgroundColor: backgroundColor.value,
  }));

  return (
    <PressAnimated
      disabled={disable}
      onPress={onPress}
      style={[style, btnStyle]}>
      {children}
    </PressAnimated>
  );
};

const BtnTheme = (props: BtnAnimatedProps) => {
  const {
    colors: {card},
  } = useTheme();

  return <BtnAnimated {...props} bgColor={card}></BtnAnimated>;
};

export {BtnAnimated, BtnTheme};
