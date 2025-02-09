import React from 'react';
import {
  Group,
  Line,
  LineProps,
  Text,
  TextProps,
} from '@shopify/react-native-skia';

type Props = {
  textProps: TextProps;
  lineProps: LineProps;
};

const YAxis = ({textProps, lineProps}: Props) => {
  return (
    <Group>
      <Text {...textProps} />
      <Line {...lineProps} />
    </Group>
  );
};

export default YAxis;
