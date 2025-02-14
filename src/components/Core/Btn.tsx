import {StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {debounce} from 'lodash';
import {PressAnimate} from './Reanimated';

interface BtnAnimatedProps {
  style?: StyleProp<ViewStyle>;
  bgColor?: string;
  isShow?: boolean;
  disable?: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}

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

  const handlePress = debounce(
    () => {
      onPress();
    },
    345,
    {leading: true, trailing: false},
  );

  const btnStyle = useAnimatedStyle(() => ({
    opacity: display.value,
    backgroundColor: backgroundColor.value,
  }));

  return (
    <PressAnimate
      disabled={disable}
      onPress={handlePress}
      style={[style, btnStyle]}>
      {children}
    </PressAnimate>
  );
};

export {BtnAnimated};
