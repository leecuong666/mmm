import {memo, useEffect, useMemo} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Notifi} from './AppProvider';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {Text} from 'react-native-gesture-handler';
import {StyleSheet, View} from 'react-native';
import {dimension} from '../contants/appInfo';
import {colors} from '../contants/color';
import {shadow} from '../styles/shadow';
import {Error, Success, Warning} from '../contants/svgs';
import {X} from 'lucide-react-native';
import {fonts} from '../contants/fonts';
import {BtnAnimated} from './Btn';

const iconSize = 35;

const Notification = ({id, message, type, onAnimationEnd}: Notifi) => {
  const {bottom} = useSafeAreaInsets();
  const initOffset = useMemo(() => bottom + 16, []);

  const offset = useSharedValue(-10);

  useEffect(() => {
    startAnimation();
  }, [id]);

  const startAnimation = () => {
    if (!id) return;

    offset.value = withSequence(
      withTiming(initOffset),
      withDelay(3000, endAnimation()),
    );
  };

  const endAnimation = () =>
    withTiming(-10, {duration: 300}, finished => {
      if (finished && onAnimationEnd) {
        runOnJS(onAnimationEnd)(finished);
      }
    });

  const handleClose = () => {
    offset.value = endAnimation();
  };

  const notifiStyle = useAnimatedStyle(() => ({
    bottom: offset.value,
    opacity: interpolate(offset.value, [-10, initOffset], [0, 1]),
  }));

  if (!id) return null;

  return (
    <Animated.View style={[styles.notifiContainer, notifiStyle]}>
      <View style={styles.alertContainer}>
        {type == 'success' ? (
          <Success width={iconSize} height={iconSize} />
        ) : type == 'warning' ? (
          <Warning width={iconSize} height={iconSize} />
        ) : (
          <Error width={iconSize} height={iconSize} />
        )}

        <Text style={styles.message}>{message}</Text>
      </View>

      <BtnAnimated
        bgColor={colors.main2}
        onPress={handleClose}
        style={styles.closeBtn}>
        <X color={'white'} size={iconSize * 0.5} />
      </BtnAnimated>
    </Animated.View>
  );
};

export default memo(Notification);

const styles = StyleSheet.create({
  notifiContainer: {
    position: 'absolute',
    width: dimension.width * 0.8,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.main1,
    borderRadius: 30,
    padding: 8,
    boxShadow: shadow(),
    gap: 10,
  },

  alertContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: 10,
  },

  message: {
    flexWrap: 'wrap',
    color: colors.text1,
    fontSize: dimension.width * 0.038,
    fontFamily: fonts.regular,
  },

  closeBtn: {
    borderRadius: '50%',
    padding: 5,
  },
});
