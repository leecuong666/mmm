import {StyleSheet, View} from 'react-native';
import React, {forwardRef, Ref, useImperativeHandle} from 'react';
import {Bill, Logo, Schedule} from '../../contants/svgs';
import {dimension} from '../../contants/appInfo';
import {useTheme} from '@react-navigation/native';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {colors} from '../../contants/color';
import {shadow} from '../../styles/shadow';
import {ChartNoAxesCombined} from 'lucide-react-native';
import {debounce} from 'lodash';
import {PressAnimate} from '../Core/Reanimated';

const {tabCurve, tabW} = dimension;

const logoSize = tabCurve * 0.6;
const iconSize = logoSize * 0.63;
const pad = 8;
const floatingSize = iconSize + pad * 2.5;
const centerLogo = (logoSize + pad * 2) / 2 - floatingSize / 2;
const initPos = {x: centerLogo, y: centerLogo};

interface Props {
  onNavigate: () => void;
  onMainTabPress: (state: number) => void;
}

export interface MainTabRef {
  closeMainTab: () => void;
}

const openConfig = {duration: 1000};
const closeConfig = {duration: 150};

const MainTab = ({onNavigate, onMainTabPress}: Props, ref: Ref<MainTabRef>) => {
  const {
    colors: {card, background},
  } = useTheme();
  const isPress = useSharedValue(0);
  const firstBtn = useSharedValue(initPos);
  const secondBtn = useSharedValue(initPos);
  const thirdBtn = useSharedValue(initPos);

  useImperativeHandle(
    ref,
    () => ({
      closeMainTab: handleClose,
    }),
    [],
  );

  const handleOpen = () => {
    firstBtn.value = withSpring(
      {...firstBtn.value, y: -(logoSize * 1.5)},
      openConfig,
    );
    secondBtn.value = withDelay(
      60,
      withSpring({x: -(logoSize * 1.3), y: -logoSize / 1.7}, openConfig),
    );
    thirdBtn.value = withDelay(
      180,
      withSpring({x: logoSize * 1.5, y: -logoSize / 1.8}, openConfig),
    );
    isPress.value = withTiming(1, {duration: 500});
  };

  const handleClose = () => {
    firstBtn.value = withTiming(initPos, closeConfig);
    secondBtn.value = withTiming(initPos, closeConfig);
    thirdBtn.value = withTiming(initPos, closeConfig);
    isPress.value = withTiming(0, {duration: 500});
  };

  const handlePressBtn = debounce(
    () => {
      if (isPress.value === 0) {
        handleOpen();
      } else {
        handleClose();
      }

      onMainTabPress(isPress.value);
    },
    666,
    {leading: true, trailing: false},
  );

  const btnStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      isPress.value,
      [0, 1],
      [card, colors.text2],
    ),
  }));

  const firtBtnStyle = useAnimatedStyle(() => ({
    left: firstBtn.value.x,
    top: firstBtn.value.y,
  }));

  const secondBtnStyle = useAnimatedStyle(() => ({
    left: secondBtn.value.x,
    top: secondBtn.value.y,
  }));

  const thirdBtnStyle = useAnimatedStyle(() => ({
    left: thirdBtn.value.x,
    top: thirdBtn.value.y,
  }));

  return (
    <View style={styles.container}>
      <PressAnimate
        onPress={onNavigate}
        style={[styles.btnDefault, firtBtnStyle]}>
        <Bill width={iconSize} height={iconSize} fill={colors.main2} />
      </PressAnimate>

      <PressAnimate
        onPress={onNavigate}
        style={[styles.btnDefault, secondBtnStyle]}>
        <Schedule width={iconSize} height={iconSize} fill={colors.main2} />
      </PressAnimate>

      <PressAnimate
        onPress={onNavigate}
        style={[styles.btnDefault, thirdBtnStyle]}>
        <ChartNoAxesCombined size={iconSize} stroke={colors.main2} />
      </PressAnimate>

      <PressAnimate
        style={[styles.maintabContainer, btnStyle]}
        onPress={handlePressBtn}>
        <Logo width={logoSize} height={logoSize} fill={background} />
      </PressAnimate>
    </View>
  );
};

export default forwardRef<MainTabRef, Props>(MainTab);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: tabW / 2 - logoSize / 2 - pad,
    top: -logoSize * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  maintabContainer: {
    borderRadius: '50%',
    padding: pad,
    boxShadow: shadow(1, 1),
  },

  btnDefault: {
    position: 'absolute',
    backgroundColor: colors.main3,
    alignItems: 'center',
    justifyContent: 'center',
    width: floatingSize,
    height: floatingSize,
    borderRadius: '50%',
    boxShadow: shadow(1, 1),
  },
});
