import React from 'react';
import {SharedValue, useDerivedValue} from 'react-native-reanimated';
import {Circle, Group, Path, Skia} from '@shopify/react-native-skia';
import {colors} from '../../../../contants/color';

type Props = {
  cx: SharedValue<number>;
  cy: SharedValue<number>;
  display: SharedValue<number>;
  chartHeight: number;
};

const Cursor = ({cx, cy, display, chartHeight}: Props) => {
  const path = useDerivedValue(() => {
    const dottedLine = Skia.Path.Make().lineTo(0, chartHeight - cy.value);
    dottedLine.dash(10, 10, 0);

    const matrix = Skia.Matrix();
    matrix.translate(cx.value, cy.value);
    dottedLine.transform(matrix);

    return dottedLine;
  });

  return (
    <Group opacity={display}>
      <Path
        path={path}
        color={colors.inactTextGray}
        style="stroke"
        strokeJoin="round"
        strokeWidth={2}
      />

      <Circle
        r={5}
        cx={cx}
        cy={cy}
        strokeWidth={2}
        color={colors.lightBg}
        style={'stroke'}
      />
      <Circle r={4} cx={cx} cy={cy} color={'#b4b4f9'} style={'fill'} />
    </Group>
  );
};

export default Cursor;
