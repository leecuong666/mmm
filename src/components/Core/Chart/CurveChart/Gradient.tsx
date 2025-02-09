import React from 'react';
import {Blur, LinearGradient, Path, Skia} from '@shopify/react-native-skia';
import {colors} from '../../../../contants/color';

type Props = {
  chartLine: string;
  width: number;
  height: number;
  margin: number;
};

const Gradient = ({chartLine, width, height, margin}: Props) => {
  const getGradientArea = (
    chartLine: string,
    width: number,
    height: number,
  ) => {
    const line = Skia.Path.MakeFromSVGString(chartLine!);

    if (line) {
      line
        .lineTo(width, height)
        .lineTo(margin, height)
        .lineTo(margin, line.getPoint(0).y);
    }

    return line;
  };

  return (
    <Path path={getGradientArea(chartLine, width, height)!}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0, y: height}}
        colors={[`${colors.darkPrimary}70`, 'rgba(0,0,0,0.01)']}
      />
      <Blur blur={3} />
    </Path>
  );
};

export default Gradient;
