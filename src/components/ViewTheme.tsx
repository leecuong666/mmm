import {StyleProp, ViewProps} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewProps>;
}

const ViewTheme = ({children, style}: Props) => {
  const {
    colors: {card},
  } = useTheme();

  const cardColor = useDerivedValue(
    () => withTiming(card, {duration: 300}),
    [card],
  );

  const cardStyle = useAnimatedStyle(() => ({
    backgroundColor: cardColor.value,
  }));

  return <Animated.View style={[style, cardStyle]}>{children}</Animated.View>;
};

export default ViewTheme;
