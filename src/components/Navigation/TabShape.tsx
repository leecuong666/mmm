import React, {useMemo} from 'react';
import Svg, {Path} from 'react-native-svg';
import {colors} from '../../contants/color';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {dimension} from '../../contants/appInfo';

const {tabH, tabW, tabRadius, tabCurve} = dimension;

const TabShape = () => {
  const {bottom} = useSafeAreaInsets();

  const d = useMemo(() => {
    const halfW = tabW / 2;

    return `
        M ${tabRadius} ${tabH} 
        Q 0 ${tabH}, 0 ${tabH - tabRadius}
        L 0 ${tabRadius}
        Q 0 0, ${tabRadius} 0
        L ${halfW - tabCurve} 0
        Q ${halfW - tabCurve / 1.6} 0, ${halfW - tabRadius} ${tabCurve / 3}
        A ${tabCurve} ${tabCurve * 3} 0 0 0 ${halfW + tabRadius} ${tabCurve / 3}
        Q ${halfW + tabCurve / 1.6} 0, ${halfW + tabCurve} 0
        L ${tabW - tabRadius} 0
        Q ${tabW} 0, ${tabW} ${tabRadius}
        L ${tabW} ${tabH - tabRadius}
        Q ${tabW} ${tabH}, ${tabW - tabRadius} ${tabH}
        Z
    `;
  }, []);

  return (
    <Svg
      width={tabW}
      height={tabH}
      style={[
        tabStyles.container,
        {
          bottom: bottom * 0.5 + 10,
        },
      ]}>
      <Path fill={colors.main3} d={d} />
    </Svg>
  );
};

export const tabStyles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    position: 'absolute',
  },
});

export default TabShape;
