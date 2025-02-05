import React, {memo, useCallback, useEffect} from 'react';
import {Canvas, Group, Path, Text} from '@shopify/react-native-skia';
import {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import {app, dimension} from '../../contants/appInfo';
import {prepare} from '../../utils/geometry';
import {StyleSheet} from 'react-native';
import {colors} from '../../contants/color';
import useSkiaText from '../../hooks/useSkiaText';
import {Loading} from './AppProvider';
import Backdrop from '../Core/Backdrop';

const {width, height} = dimension;
const pathW = width / 5;
const pathH = height / 10;
const centerH = width / 2 - pathW / 2;
const centerV = height / 2 - pathH / 2;

const m = prepare(centerH, centerV, pathW, pathH, app.svgLogo);

const LogoLoading = ({
  bgColor = colors.backdrop,
  isVisable = false,
  fontSize = 25,
  text = '',
  textColor = colors.lightPrimary,
  textFont = require('../../assets/fonts/MazzardM-Regular.otf'),
  duration = 2222,
  time = -1,
  onAnimationEnd,
}: Loading) => {
  const progress = useSharedValue(0);
  const {font, textSize} = useSkiaText({text, fontSize, fontFamily: textFont});

  useEffect(() => {
    startAnimation();
  }, [isVisable]);

  const startAnimation = useCallback(() => {
    if (!isVisable) return (progress.value = 0);

    progress.value = withRepeat(
      withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
      }),
      time,
      true,
      end => {
        if (end) {
          onAnimationEnd && runOnJS(onAnimationEnd)(end);
        }
      },
    );
  }, [isVisable]);

  if (!isVisable) return null;

  return (
    <Backdrop display bgColor={bgColor}>
      <Canvas style={StyleSheet.absoluteFillObject}>
        <Group>
          <Path
            path={m.path!}
            color={colors.darkPrimary}
            end={progress}
            style={'stroke'}
            strokeWidth={pathW * 0.055}
            strokeCap={'round'}
            strokeJoin={'round'}
          />
          {text && (
            <Text
              x={width / 2 - textSize?.width! / 2}
              y={height / 2 - textSize?.height! / 2 + pathH}
              text={text}
              color={textColor}
              font={font}
              opacity={progress}
            />
          )}
        </Group>
      </Canvas>
    </Backdrop>
  );
};

export default memo(LogoLoading);
