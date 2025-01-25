import {Pressable, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  style?: StyleProp<ViewStyle>;
  isShow?: boolean;
  disable?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const PressAnimated = Animated.createAnimatedComponent(Pressable);

const BtnAnimated = ({
  style,
  disable = false,
  isShow = true,
  onPress,
  children,
}: Props) => {
  const display = useDerivedValue(
    () => withTiming(Number(isShow), {duration: 200}),
    [isShow],
  );

  const btnStyle = useAnimatedStyle(() => {
    return {
      opacity: display.value,
    };
  });

  return (
    <PressAnimated
      disabled={disable}
      onPress={onPress}
      style={[style, btnStyle]}>
      {children}
    </PressAnimated>
  );
};

export {BtnAnimated};
