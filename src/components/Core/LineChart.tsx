import {LayoutChangeEvent} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Canvas, Path, Skia, Text, useFont} from '@shopify/react-native-skia';
import {curveBasis, line, scaleLinear, scalePoint} from 'd3';
import {parse} from 'react-native-redash';
import {colors} from '../../contants/color';
import {useSharedValue, withTiming} from 'react-native-reanimated';

type Props = {
  data: any[];
  label: string;
  value: string;
};

type ChartSize = {
  width: number;
  height: number;
};

const LineChart = ({data, label, value}: Props) => {
  const lineAnimation = useSharedValue(0);
  const [chartSize, setChartSize] = useState<ChartSize>({width: 0, height: 0});
  const font = useFont(
    require('../../assets/fonts/MazzardM-Medium.otf'),
    chartSize?.width * 0.04,
  );

  useEffect(() => {
    lineAnimation.value = withTiming(1, {duration: 1234});
  }, []);

  const maxWidthXAxis = Math.max(
    ...data.map(item => font?.measureText(item[label]).width!),
  );
  const maxHeightXAxis = Math.max(
    ...data.map(item => font?.measureText(item[label]).height!),
  );
  const maxWidthYAxis = Math.max(
    ...data.map(item => font?.measureText(`${Math.floor(item[value])}`).width!),
  );
  const maxHeightYAxis = Math.max(
    ...data.map(item => font?.measureText(`${item[value]}`).height!),
  );

  const xDomain = data.map(item => item[label]);
  const xRange = [
    maxWidthXAxis / 2 + maxWidthYAxis,
    chartSize.width - maxWidthXAxis / 2,
  ];
  const xScale = scalePoint().domain(xDomain).range(xRange).padding(0);

  const maxY = Math.max(...data.map(item => item[value]));
  const minY = Math.min(...data.map(item => item[value]));

  const yDomain = [minY, maxY];
  const yRange = [chartSize.height - maxHeightXAxis, 0];
  const yScale = scaleLinear().domain(yDomain).range(yRange).nice();
  const yTicks = yScale.ticks(5);

  console.log(data);
  console.log(yTicks);

  const curvedLine = line()
    .x(d => xScale(d[label]))
    .y(d => yScale(d[value]))
    .curve(curveBasis)(data);
  const normalLine = Skia.Path.MakeFromSVGString(curvedLine!);

  const getLayoutSize = useCallback((e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;

    setChartSize({width, height});
  }, []);

  return (
    <Canvas style={{flex: 1}} onLayout={getLayoutSize}>
      <Path
        path={normalLine!}
        style={'stroke'}
        strokeWidth={3}
        color={colors.darkPrimary}
        strokeCap={'round'}
        start={0}
        end={lineAnimation}
      />

      {data.map((item, index) => {
        const title = item[label];
        const textSize = font?.measureText(title);

        return (
          <Text
            key={index}
            x={xScale(title)! - textSize?.width! / 2}
            y={chartSize.height}
            font={font}
            text={title}
            color={colors.inactTextGray}
          />
        );
      })}
    </Canvas>
  );
};

export default LineChart;
