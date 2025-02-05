import {StyleSheet, View} from 'react-native';
import React, {forwardRef, Ref} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {tabStyles} from './TabShape';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Tab from './Tab';
import {RootBottomTabsParams} from '../../navigation/types';
import {dimension} from '../../contants/appInfo';
import MainTab, {MainTabRef} from './MainTab';
import Pointer from './Pointer';

interface Props extends BottomTabBarProps {
  onMainTabPress: (state: number) => void;
  onTabChange: () => void;
}

const {tabW, tabH} = dimension;
const spacing = tabW * 0.28;

const TabsCustom = (
  {state, navigation, onMainTabPress, onTabChange}: Props,
  ref: Ref<MainTabRef>,
) => {
  const {bottom} = useSafeAreaInsets();

  const handleNavigate = () => {};

  return (
    <View style={[styles.container, {bottom: bottom * 0.5 + 10}]}>
      {state.routes.map((route, index) => {
        const label = route.name as keyof RootBottomTabsParams;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }

          onTabChange();
        };

        return (
          <Tab
            key={index.toString()}
            isFocus={isFocused}
            label={label}
            onPress={onPress}
          />
        );
      })}

      <Pointer
        index={state.index}
        space={spacing}
        amount={state.routes.length}
      />

      <MainTab
        ref={ref}
        onNavigate={handleNavigate}
        onMainTabPress={onMainTabPress}
      />
    </View>
  );
};

export default forwardRef<MainTabRef, Props>(TabsCustom);

const styles = StyleSheet.create({
  container: {
    ...tabStyles.container,
    width: tabW,
    height: tabH,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing,
  },
});
