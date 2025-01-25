import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {Fanalyze, Mmoney, Mtime} from '../../contants/svgs';
import {dimension} from '../../contants/appInfo';
import IntroItem from './IntroItem';
import {colors} from '../../contants/color';
import {BtnAnimated} from '../../components/Btn';
import {textStyle} from '../../styles/text';
import DotsItem from './DotsItem';
import {RootStackParams} from '../../navigation/types';
import useAppNavigate from '../../hooks/useAppNavigate';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {updateIntroduceState} from '../../redux/appStateSlice';

export type Intro = {img: React.ReactNode; title: string; content: string};

const introSize = dimension.width;
const imgSize = introSize * 0.9;

const introduceData: Intro[] = [
  {
    img: <Mmoney width={imgSize} height={imgSize} />,
    title: 'Smart Spending',
    content:
      'Manage your finances effortlessly and achieve your financial goals.',
  },
  {
    img: <Mtime width={imgSize} height={imgSize} />,
    title: 'Task Reminders',
    content: 'Never miss a deadline or task with real-time job alerts.',
  },
  {
    img: <Fanalyze width={imgSize} height={imgSize} />,
    title: 'Insightful Analytics',
    content: 'Unlock powerful insights and make data-driven decisions.',
  },
];

const Introduce = () => {
  const introRef = useRef<FlatList>(null);
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate<RootStackParams>();
  const [offsetTracking, setOffsetTracking] = useState(0);

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      setOffsetTracking(e.nativeEvent.contentOffset.x);
    },
    [],
  );

  const handleControllIntro = useCallback(
    (state: number) => {
      const nextOffset = offsetTracking / introSize + state;

      if (nextOffset > introduceData.length - 1) {
        dispatch(updateIntroduceState());
        return navigation.navigate('SignIn');
      }

      introRef?.current?.scrollToIndex({
        index: nextOffset,
        animated: true,
      });
    },
    [offsetTracking],
  );

  const renderIntroduce = useCallback(
    ({item}: {item: Intro}) => <IntroItem {...item} />,
    [],
  );

  const renderDots = useCallback(
    ({index}: {index: number}) => (
      <DotsItem index={index} offset={offsetTracking} stepSize={introSize} />
    ),
    [offsetTracking],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={introRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={introduceData}
        keyExtractor={item => item.title}
        renderItem={renderIntroduce}
        getItemLayout={(_, index) => ({
          length: introSize,
          offset: introSize * index,
          index,
        })}
        onScroll={handleScroll}
        bounces={false}
      />

      <View style={styles.footerContainer}>
        <BtnAnimated
          onPress={() => handleControllIntro(-1)}
          isShow={offsetTracking / introSize > 0}
          disable={offsetTracking / introSize == 0}
          style={[styles.btnContainer, {backgroundColor: colors.main2}]}>
          <Text style={styles.btnText}>Back</Text>
        </BtnAnimated>

        <FlatList
          data={Array.from({length: introduceData.length}).fill(null)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderDots}
          horizontal
          contentContainerStyle={styles.dotsContainer}
        />

        <BtnAnimated
          onPress={() => handleControllIntro(1)}
          style={[styles.btnContainer, {backgroundColor: colors.main3}]}>
          <Text style={styles.btnText}>Next</Text>
        </BtnAnimated>
      </View>
    </SafeAreaView>
  );
};

export default Introduce;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.main1,
  },

  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: dimension.pH,
  },

  btnContainer: {
    paddingVertical: 10,
    paddingHorizontal: dimension.width * 0.04,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    ...textStyle.content,
    color: colors.main1,
  },

  dotsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
});
