import {Text, useFont} from '@shopify/react-native-skia';
import React from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {colors} from '../../../../contants/color';

type Props = {
  text: SharedValue<number>;
  cx: SharedValue<number>;
  cy: SharedValue<number>;
  opacity: SharedValue<number>;
  width: number;
  height: number;
};

const xPadding = 10;
const yPadding = 20;

const Tooltip = ({text, cx, cy, opacity, width, height}: Props) => {
  const font = useFont(
    require('../../../../assets/fonts/MazzardM-Medium.otf'),
    20,
  );

  const textAnimation = useDerivedValue(() => `${Math.round(text.value)}`);

  const textX = useDerivedValue(() => {
    const size = font?.measureText(textAnimation.value);
    console.log(size);

    return cx.value + xPadding;
  });
  const textY = useDerivedValue(() => cy.value - yPadding);

  return (
    <Text
      opacity={opacity}
      text={textAnimation}
      x={textX}
      y={textY}
      font={font}
      color={colors.lightBg}
    />
  );
};

export default Tooltip;
