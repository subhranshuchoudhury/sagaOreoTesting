/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <View style={style.container}>
      <SafeAreaView>
        {/* <Home /> */}
        <Login />
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },
});

export default App;
