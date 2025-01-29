import React, {useEffect} from 'react';
import {Canvas, Group, Path, Text} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import {app, dimension} from '../contants/appInfo';
import {prepare} from '../utils/geometry';
import {StyleSheet} from 'react-native';
import {colors} from '../contants/color';
import useSkiaText from '../hooks/useSkiaText';

interface Props {
  bgColor?: string;
  isVisable: boolean;
  fontSize?: number;
  text?: string;
}

const {width, height} = dimension;
const pathW = width / 5;
const pathH = height / 10;
const centerH = width / 2 - pathW / 2;
const centerV = height / 2 - pathH / 2;

const m = prepare(centerH, centerV, pathW, pathH, app.svgLogo);

const LogoLoading = ({
  bgColor = 'rgba(0,0,0,0.6)',
  isVisable = true,
  fontSize = 25,
  text = '',
}: Props) => {
  const progress = useSharedValue(0);
  const {font, textSize} = useSkiaText({text, fontSize});

  useEffect(() => {
    startAnimation();
  }, [isVisable]);

  const startAnimation = () => {
    if (!isVisable) return (progress.value = 0);

    progress.value = withRepeat(
      withTiming(1, {
        duration: 2222,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  };

  if (!isVisable) return;

  return (
    <Animated.View
      entering={FadeIn.duration(800)}
      exiting={FadeOut.duration(800)}
      style={styles.container}>
      <Canvas style={[styles.container, {backgroundColor: bgColor}]}>
        <Group>
          <Path
            path={m.path!}
            color={colors.main3}
            end={progress}
            style={'stroke'}
            strokeWidth={pathW * 0.055}
            strokeCap={'round'}
            strokeJoin={'round'}
          />
          <Text
            x={width / 2 - textSize?.width! / 2}
            y={height / 2 - textSize?.height! / 2 + pathH}
            text={text}
            color={colors.main1}
            font={font}
          />
        </Group>
      </Canvas>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogoLoading;
