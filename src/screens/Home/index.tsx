import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
