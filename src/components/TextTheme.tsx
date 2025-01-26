import {TextStyle, StyleProp} from 'react-native';
import React from 'react';
import {useTheme} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

interface Props {
  children: string | number;
  style?: StyleProp<TextStyle>;
}

const TextTheme = ({style, children}: Props) => {
  const {
    colors: {text},
  } = useTheme();

  const textColor = useDerivedValue(
    () => withTiming(text, {duration: 200}),
    [text],
  );

  const textStyle = useAnimatedStyle(() => ({
    color: textColor.value,
  }));

  return <Animated.Text style={[style, textStyle]}>{children}</Animated.Text>;
};

export default TextTheme;
