import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {Fanalyze, Mmoney, Mtime} from '../../contants/svgs';
import {dimension} from '../../contants/appInfo';
import IntroItem from './IntroItem';
import {colors} from '../../contants/color';
import {BtnAnimated} from '../../components/Btn';
import {textStyle} from '../../styles/text';
import DotsItem from './DotsItem';
import {RootStackParams} from '../../navigation/types';
import useAppNavigate from '../../hooks/useAppNavigate';
import {useAppDispatch, useAppSelector} from '../../hooks/reduxHooks';
import {updateIntroduceState} from '../../redux/appStateSlice';
import useAppLanguage from '../../hooks/useAppLanguage';
import {IntroduceLng} from '../../language/type';
import notifee from '@notifee/react-native';

const introSize = dimension.width;
const imgSize = introSize * 0.9;

const introduceData = [
  <Mmoney width={imgSize} height={imgSize} />,
  <Mtime width={imgSize} height={imgSize} />,
  <Fanalyze width={imgSize} height={imgSize} />,
];

const Introduce = () => {
  const {
    button: {back, next},
    introduceList,
  } = useAppLanguage<IntroduceLng>('screens.Introduce');

  const introRef = useRef<FlatList>(null);
  const dispatch = useAppDispatch();
  const {isShowIntroduce} = useAppSelector(state => state.appState);
  const navigation = useAppNavigate<RootStackParams>();
  const [offsetTracking, setOffsetTracking] = useState(0);

  useLayoutEffect(() => {
    if (!isShowIntroduce) return signNavigate();
  }, []);

  useEffect(() => {
    requestNotifiPermission();
  }, []);

  const signNavigate = () => {
    navigation.navigate('SignIn');
  };

  const requestNotifiPermission = async () => {
    await notifee.requestPermission();
  };

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
        return signNavigate();
      }

      introRef?.current?.scrollToIndex({
        index: nextOffset,
        animated: true,
      });
    },
    [offsetTracking],
  );

  const renderIntroduce = useCallback(
    ({item, index}: {item: React.ReactNode; index: number}) => (
      <IntroItem
        img={item}
        title={introduceList[index].title}
        content={introduceList[index].content}
      />
    ),
    [],
  );

  const renderDots = useCallback(
    ({index}: {index: number}) => (
      <DotsItem index={index} offset={offsetTracking / introSize} />
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
        keyExtractor={(_, index) => index.toString()}
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
          bgColor={colors.text1}
          style={styles.btnContainer}>
          <Text style={styles.btnText}>{back}</Text>
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
          bgColor={colors.main3}
          style={styles.btnContainer}>
          <Text style={styles.btnText}>{next}</Text>
        </BtnAnimated>
      </View>
    </SafeAreaView>
  );
};

export default Introduce;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
