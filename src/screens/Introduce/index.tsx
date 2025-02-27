import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Fanalyze, Mmoney, Mtime} from '../../contants/svgs';
import {dimension} from '../../contants/appInfo';
import IntroItem from './IntroItem';
import {colors} from '../../contants/color';
import {BtnAnimated} from '../../components/Core/Btn';
import {textStyle} from '../../styles/text';
import DotsItem from './DotsItem';
import {RootStackParams} from '../../navigation/types';
import useAppNavigate from '../../hooks/useAppNavigate';
import useAppLanguage from '../../hooks/useAppLanguage';
import {IntroduceLng} from '../../language/type';
import notifee from '@notifee/react-native';
import useAppStore from '../../zustand/appStore';
import {runOnJS, useSharedValue} from 'react-native-reanimated';

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
  const {updateIntroduceState} = useAppStore();
  const navigation = useAppNavigate<RootStackParams>();
  const offsetTracking = useSharedValue(0);
  const [isShowBackBtn, setIsShowBackBtn] = useState(false);

  useEffect(() => {
    requestNotifiPermission();
  }, []);

  const requestNotifiPermission = async () => {
    await notifee.requestPermission();
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const xOffset = e.nativeEvent.contentOffset.x;

    runOnJS(setIsShowBackBtn)(xOffset / introSize > 0);
    offsetTracking.value = xOffset;
  };

  const handleControllIntro = (state: number) => {
    const nextOffset = offsetTracking.value / introSize + state;

    if (nextOffset > introduceData.length - 1) {
      updateIntroduceState();
      return navigation.navigate('SignIn');
    }

    introRef?.current?.scrollToIndex({
      index: nextOffset,
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={introRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        data={introduceData}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <IntroItem
            img={item}
            title={introduceList[index].title}
            content={introduceList[index].content}
          />
        )}
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
          isShow={isShowBackBtn}
          disable={!isShowBackBtn}
          bgColor={colors.darkText}
          style={styles.btnContainer}>
          <Text style={styles.btnText}>{back}</Text>
        </BtnAnimated>

        <FlatList
          data={Array.from({length: introduceData.length}).fill(null)}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({index}) => (
            <DotsItem
              index={index}
              offset={offsetTracking}
              itemWidth={introSize}
            />
          )}
          horizontal
          contentContainerStyle={styles.dotsContainer}
        />

        <BtnAnimated
          onPress={() => handleControllIntro(1)}
          bgColor={colors.darkPrimary}
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
    paddingBottom: 10,
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
    color: colors.lightBg,
  },

  dotsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
});
