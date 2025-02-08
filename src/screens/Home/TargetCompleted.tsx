import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textStyle} from '../../styles/text';
import {colors} from '../../contants/color';
import {ClipboardList, NotepadText} from 'lucide-react-native';
import {dimension} from '../../contants/appInfo';

const {width, height} = dimension;

const iconSize = width * 0.05;

const TargetCompleted = () => {
  return (
    <View style={styles.overviewContainer}>
      <View style={styles.taskView}>
        <View style={styles.taskViewContainer}>
          <View style={styles.iconContainer}>
            <ClipboardList size={iconSize} color={colors.darkPrimary} />
          </View>

          <View style={styles.statisticContainer}>
            <Text style={styles.title}>10/12 Tasks</Text>
            <Text style={styles.content}>Completed</Text>
          </View>
        </View>

        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'white',
            alignSelf: 'center',
          }}
        />
      </View>

      <View style={styles.taskView}>
        <View style={styles.taskViewContainer}>
          <View style={styles.iconContainer}>
            <NotepadText size={iconSize} color={colors.darkPrimary} />
          </View>

          <View style={styles.statisticContainer}>
            <Text style={styles.title}>1M/2M VNĐ</Text>
            <Text style={styles.content}>Spending Target</Text>
          </View>
        </View>

        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: 'white',
            alignSelf: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default TargetCompleted;

const styles = StyleSheet.create({
  taskView: {
    backgroundColor: colors.darkCard,
    padding: width * 0.035,
    borderRadius: 22,
    flex: 1,
    gap: height * 0.012,
  },

  taskViewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: width * 0.018,
  },

  iconContainer: {
    borderWidth: 0.5,
    borderColor: colors.inactTextGray,
    padding: width * 0.015,
    borderRadius: width * 0.02,
  },

  statisticContainer: {
    gap: height * 0.001,
  },

  title: {
    ...textStyle.title,
    color: colors.lightText,
    fontSize: width * 0.04,
  },

  content: {
    ...textStyle.content,
    color: colors.darkText,
    fontSize: width * 0.03,
  },

  overviewContainer: {
    flexDirection: 'row',
    gap: width * 0.04,
    justifyContent: 'space-between',
  },
});
