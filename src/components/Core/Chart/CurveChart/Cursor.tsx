import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import {Circle, Group} from '@shopify/react-native-skia';
import {colors} from '../../../../contants/color';

type Props = {
  cx: SharedValue<number>;
  cy: SharedValue<number>;
  display: SharedValue<number>;
};

const Cursor = ({cx, cy, display}: Props) => {
  return (
    <Group opacity={display}>
      <Circle
        r={6}
        cx={cx}
        cy={cy}
        strokeWidth={5}
        color={colors.darkPrimary}
        style={'stroke'}
      />
      <Circle r={4} cx={cx} cy={cy} color={colors.darkBg} style={'fill'} />
    </Group>
  );
};

export default Cursor;
