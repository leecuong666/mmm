import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../contants/color';
import {dimension} from '../../contants/appInfo';
import {fonts} from '../../contants/fonts';
import LineChart from '../../components/Core/Chart/CurveChart/LineChart';
import {data} from '../../dataMockup/chart';

const {width, height} = dimension;

const TaskOverview = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasks Overview</Text>

      <LineChart data={data} label="label" value="value" />
    </View>
  );
};

export default TaskOverview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkCard,
    borderRadius: 26,
    height: height * 0.33,
    padding: width * 0.035,
    gap: height * 0.015,
  },

  title: {
    color: colors.lightText,
    fontFamily: fonts.semiBold,
    fontSize: width * 0.05,
  },
});
