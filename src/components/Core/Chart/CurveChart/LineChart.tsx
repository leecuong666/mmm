import {LayoutChangeEvent} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Canvas,
  Group,
  Path,
  Skia,
  Text,
  useFont,
  Line,
  vec,
  LinearGradient,
} from '@shopify/react-native-skia';
import {line, scaleLinear, scalePoint, curveMonotoneX} from 'd3';
import {parse} from 'react-native-redash';
import {colors} from '../../../../contants/color';
import {useSharedValue, withDelay, withTiming} from 'react-native-reanimated';
import YAxis from './YAxis';
import Gradient from './Gradient';

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
    require('../../../../assets/fonts/MazzardM-Medium.otf'),
    chartSize?.width * 0.04,
  );

  useEffect(() => {
    lineAnimation.value = withTiming(1, {duration: 888});
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
    maxWidthXAxis / 2 + maxWidthYAxis * 1.25,
    chartSize.width - maxWidthXAxis / 2,
  ];
  const xScale = scalePoint().domain(xDomain).range(xRange).padding(0);

  const maxY = Math.max(...data.map(item => item[value]));
  const minY = Math.min(...data.map(item => item[value]));

  const yDomain = [minY, maxY];
  const yRange = [
    chartSize.height - maxHeightYAxis - maxHeightXAxis,
    maxHeightXAxis,
  ];
  const yScale = scaleLinear().domain(yDomain).range(yRange).nice();
  const yTicks = yScale.ticks(5);

  const curvedLine = line()
    .x(d => xScale(d[label])!)
    .y(d => yScale(d[value])!)
    .curve(curveMonotoneX)(data);
  const singleLine = Skia.Path.MakeFromSVGString(curvedLine!);

  const getLayoutSize = useCallback((e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;

    setChartSize({width, height});
  }, []);

  return (
    <Canvas style={{flex: 1}} onLayout={getLayoutSize}>
      {/* y axis render */}
      {yTicks.map((item, index) => {
        const posItem = yScale(item);

        return (
          <YAxis
            key={index}
            textProps={{
              x: 0,
              y: posItem,
              font: font,
              text: `${item}`,
              color: colors.inactTextGray,
            }}
            lineProps={{
              p1: vec(maxWidthYAxis * 1.25, posItem),
              p2: vec(chartSize.width, posItem),
              color: colors.inactTextGray,
              style: 'stroke',
              strokeWidth: 0.5,
              opacity: 0.5,
            }}
          />
        );
      })}

      {/* x axis render */}
      {data.map((item, index) => {
        const title = item[label];
        const textSize = font?.measureText(title);

        return (
          <Text
            key={index}
            x={xScale(title)! - textSize?.width! / 2}
            y={chartSize.height - textSize?.height! / 2}
            font={font}
            text={title}
            color={colors.inactTextGray}
          />
        );
      })}

      {/* main curved line */}
      <Path
        path={singleLine!}
        style={'stroke'}
        strokeWidth={3}
        color={colors.darkPrimary}
        strokeCap={'round'}
        start={0}
        end={lineAnimation}
      />

      <Gradient
        chartLine={curvedLine!}
        width={chartSize.width - maxWidthXAxis / 2}
        height={chartSize.height - maxHeightXAxis * 2}
        margin={maxWidthXAxis / 2 + maxWidthYAxis * 1.25}
      />
    </Canvas>
  );
};

export default LineChart;
