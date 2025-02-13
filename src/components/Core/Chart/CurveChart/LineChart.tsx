import {LayoutChangeEvent} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Canvas,
  Path,
  Skia,
  Text,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import {line, scaleLinear, scalePoint, curveMonotoneX} from 'd3';
import {getYForX, parse} from 'react-native-redash';
import {colors} from '../../../../contants/color';
import {clamp, useSharedValue, withTiming} from 'react-native-reanimated';
import YAxis from './YAxis';
import Gradient from './Gradient';
import {
  Gesture,
  GestureDetector,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Cursor from './Cursor';
import Tooltip from './Tooltip';

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

  //cursor
  const cx = useSharedValue(0);
  const cy = useSharedValue(0);
  const display = useSharedValue(0);

  //tooltip
  const valueSelected = useSharedValue(0);

  useEffect(() => {
    lineAnimation.value = withTiming(1, {duration: 888});
  }, []);

  const minXRange = maxWidthXAxis / 2 + maxWidthYAxis * 1.25;
  const maxXRange = chartSize.width - maxWidthXAxis / 2;
  const xScale = scalePoint()
    .domain(data.map(item => item[label]))
    .range([minXRange, maxXRange])
    .padding(0);
  const step = xScale.step();

  const maxY = Math.max(...data.map(item => item[value]));
  const minY = Math.min(...data.map(item => item[value]));

  const minYRange = maxHeightXAxis;
  const maxYRange = chartSize.height - maxHeightYAxis - maxHeightXAxis;
  const yScale = scaleLinear()
    .domain([minY, maxY])
    .range([maxYRange, minYRange])
    .nice();
  const yTicks = yScale.ticks(5);

  const curvedLine = line()
    .x(d => xScale(d[label])!)
    .y(d => yScale(d[value])!)
    .curve(curveMonotoneX)(data);
  const singleLine = Skia.Path.MakeFromSVGString(curvedLine!);

  const path = curvedLine?.includes('NaN')
    ? null
    : parse(singleLine!.toSVGString());

  const handlePanCursor = (e: PanGestureHandlerEventPayload) => {
    'worklet';

    const clampValue = clamp(e.absoluteX, minXRange, maxXRange);

    const index = Math.round(clampValue / step) - 1;

    valueSelected.value = withTiming(data[index < 0 ? 0 : index][value]);

    const centerY = getYForX(path!, clampValue);

    if (centerY == null) return;

    cx.value = clampValue;
    cy.value = centerY!;
  };

  const handleCursorTouch = (state: 'up' | 'down') => {
    'worklet';
    display.value = withTiming(state === 'down' ? 1 : 0, {duration: 250});
  };

  const pan = Gesture.Pan()
    .onTouchesDown(() => {
      handleCursorTouch('down');
    })
    .onTouchesUp(() => {
      handleCursorTouch('up');
    })
    .onBegin(handlePanCursor)
    .onChange(handlePanCursor);

  const getLayoutSize = useCallback((e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout;

    setChartSize({width, height});
  }, []);

  return (
    <GestureDetector gesture={pan}>
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
          width={maxXRange}
          height={chartSize.height - maxHeightXAxis * 2}
          margin={minXRange}
        />

        <Cursor cx={cx} cy={cy} display={display} />

        <Tooltip
          text={valueSelected}
          cx={cx}
          cy={cy}
          opacity={display}
          width={chartSize.width}
          height={maxYRange}
        />
      </Canvas>
    </GestureDetector>
  );
};

export default LineChart;
