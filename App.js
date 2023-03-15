/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
// import Test from './components/Test';
import Notices from './components/Notices';

const App = () => {
  return (
    <View style={style.container}>
      <SafeAreaView>
        <Notices />
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#ffff',
  },
});

export default App;
