import {StyleProp, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import {Theme, useTheme} from '@react-navigation/native';

interface Props {
  displayBg?: boolean;
  children: (colors: Theme) => React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const ViewTheme = ({displayBg = false, children, style}: Props) => {
  const theme = useTheme();

  const cardColor = useDerivedValue(
    () =>
      withTiming(displayBg ? theme.colors.card : 'transparent', {
        duration: 300,
      }),
    [theme.colors.card, displayBg],
  );

  const cardStyle = useAnimatedStyle(() => ({
    backgroundColor: cardColor.value,
  }));

  return (
    <Animated.View style={[style, cardStyle]}>{children(theme)}</Animated.View>
  );
};

export default memo(ViewTheme);
