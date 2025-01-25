import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {dimension} from '../../contants/appInfo';
import {Intro} from '.';
import {textStyle} from '../../styles/text';
import {colors} from '../../contants/color';

interface Props extends Intro {}

const IntroItem = ({img, title, content}: Props) => {
  return (
    <View style={styles.container}>
      {img}

      <View style={styles.contentContainer}>
        <Text style={[textStyle.title, {color: colors.text2}]}>{title}</Text>

        <Text style={[textStyle.content, {color: '#a9aab3'}]}>{content}</Text>
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
