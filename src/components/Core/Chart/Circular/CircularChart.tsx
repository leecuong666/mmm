import React, {useEffect} from 'react';
import {
  Blur,
  Canvas,
  Group,
  Path,
  Skia,
  Text,
} from '@shopify/react-native-skia';
import useSkiaText from '../../../../hooks/useSkiaText';
import {colors} from '../../../../contants/color';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  percentage: number;
  radius: number;
  mainCircularColor?: string;
  subCircularColor?: string;
  strokeWidth: number;
};

const CircularChart = ({
  percentage,
  radius,
  strokeWidth,
  subCircularColor = colors.chartBg,
  mainCircularColor = colors.completed,
}: Props) => {
  const circularEnd = useSharedValue(0);

  const {font, textSize} = useSkiaText({
    text: `${percentage}%`,
    fontSize: 18,
  });
  const percent = useDerivedValue(() => `${percentage}%`, []);

  const matrix = Skia.Matrix();
  matrix.translate(radius, radius);
  matrix.rotate(-1.55);
  matrix.translate(-radius, -radius);

  const path = Skia.Path.Make().addCircle(
    radius,
    radius,
    radius - strokeWidth / 2,
  );
  path.transform(matrix);

  useEffect(() => {
    circularEnd.value = withTiming(percentage / 100, {duration: 1000});
  }, []);

  return (
    <Canvas style={{flex: 1}}>
      <Path
        path={path}
        strokeWidth={strokeWidth}
        color={subCircularColor}
        style={'stroke'}
        strokeJoin={'round'}
        strokeCap={'round'}
        start={0}
        end={1}>
        <Blur blur={0.5} />
      </Path>

      <Group>
        <Path
          path={path}
          strokeWidth={strokeWidth}
          color={mainCircularColor}
          style={'stroke'}
          strokeJoin={'round'}
          strokeCap={'round'}
          start={0}
          end={circularEnd}
        />
      </Group>

      <Text
        text={percent}
        x={radius - textSize?.width! / 2}
        y={radius + textSize?.height! / 2}
        font={font}
        color={colors.lightText}
      />
    </Canvas>
  );
};

export default CircularChart;
