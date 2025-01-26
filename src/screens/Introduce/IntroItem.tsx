import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {dimension} from '../../contants/appInfo';
import {textStyle} from '../../styles/text';
import {colors} from '../../contants/color';
import TextTheme from '../../components/TextTheme';

interface Props {
  img: React.ReactNode;
  title: string;
  content: string;
}

const IntroItem = ({img, title, content}: Props) => {
  return (
    <View style={styles.container}>
      {img}

      <View style={styles.contentContainer}>
        <TextTheme style={[textStyle.title, {color: colors.text1}]}>
          {title}
        </TextTheme>

        <Text style={[textStyle.content, {color: colors.text2}]}>
          {content}
        </Text>
      </View>
    </View>
  );
};

export default IntroItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: dimension.width,
    gap: dimension.height * 0.03,
  },

  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: dimension.height * 0.015,
    width: '66%',
  },
});
