import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Array.from({length: 100}).fill('test')}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({index}) => {
          return <Text>{index}</Text>;
        }}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
