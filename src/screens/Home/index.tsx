import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import TextTheme from '../../components/Core/TextTheme';
import {viewStyle} from '../../styles/view';
import useAuthenStore from '../../zustand/authenStore';
import {textStyle} from '../../styles/text';
import {fonts} from '../../contants/fonts';
import {dimension} from '../../contants/appInfo';
import FastImage from '@d11/react-native-fast-image';
import TargetCompleted from './TargetCompleted';
import TaskOverview from './TaskOverview';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width, height} = dimension;

const avtSize = width * 0.12;

const Home = () => {
  const {top} = useSafeAreaInsets();
  const {name, avatar} = useAuthenStore(state => state.user)!;

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={[viewStyle.viewSymm, viewStyle.header]}>
        <View style={styles.leftHeaderContainer}>
          <TextTheme style={textStyle.title}>Welcome</TextTheme>
          <TextTheme style={styles.userName}>{name!}</TextTheme>
        </View>

        <Pressable style={styles.avatarContainer}>
          <FastImage
            style={styles.avatar}
            source={{
              uri: avatar,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </Pressable>
      </View>

      <TargetCompleted />

      <TaskOverview />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...viewStyle.view,
    gap: height * 0.02,
  },

  leftHeaderContainer: {
    gap: 2,
  },

  userName: {
    fontSize: width * 0.045,
    fontFamily: fonts.medium,
  },

  avatarContainer: {
    borderRadius: '50%',
    overflow: 'hidden',
  },

  avatar: {
    width: avtSize,
    height: avtSize,
  },

  bodyContainer: {
    flex: 1,
  },
});
