/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './pages/Home';
import Login from './pages/Login';
import ChangePass from './pages/ChangePass';
import Webber from './pages/Webber';
import ForgotPass from './pages/ForgotPass';

const Stack = createNativeStackNavigator();
const App = props => {
  return (
    <View style={style.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{
              headerTitle: 'Oreo',
            }}
            component={Webber}
            name="Webber"
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen
            options={{headerTitle: 'Forgot Password'}}
            name="ForgotPassword"
            component={ForgotPass}
          />
          <Stack.Screen name="ChangePassword" component={ChangePass} />
        </Stack.Navigator>
      </NavigationContainer>
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
