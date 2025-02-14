import {RoundedRect, Text, useFont} from '@shopify/react-native-skia';
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
const yPadding = 30;
const xSpace = 10;
const ySpace = 8;

const Tooltip = ({text, cx, cy, opacity, width, height}: Props) => {
  const font = useFont(
    require('../../../../assets/fonts/MazzardM-Medium.otf'),
    18,
  );

  const textAnimation = useDerivedValue(() => `${Math.round(text.value)}`);

  const rectW = useDerivedValue(() => {
    const size = font?.measureText(textAnimation.value);
    return (size?.width! + xSpace) | 0;
  });
  const rectH = useDerivedValue(() => {
    const size = font?.measureText(textAnimation.value);
    return (size?.height! + ySpace) | 0;
  });

  const rectX = useDerivedValue(() => {
    if (cx.value + xPadding + rectW.value > width)
      return cx.value - xPadding - rectW.value;

    return cx.value + xPadding;
  });
  const rectY = useDerivedValue(() => {
    if (cy.value - yPadding - rectH.value < -25)
      return cy.value + yPadding - rectH.value;

    return cy.value - yPadding;
  });

  const textX = useDerivedValue(() => rectX.value + xSpace / 2);
  const textY = useDerivedValue(() => {
    const size = font?.measureText(textAnimation.value);
    return rectY.value + size?.height! + ySpace / 3;
  });

  return (
    <RoundedRect
      x={rectX}
      y={rectY}
      width={rectW}
      height={rectH}
      r={6}
      opacity={opacity}
      color={colors.lightBg}>
      <Text
        text={textAnimation}
        x={textX}
        y={textY}
        font={font}
        color={colors.darkPrimary}
      />
    </RoundedRect>
  );
};

export default Tooltip;
