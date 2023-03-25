/* eslint-disable react-native/no-inline-styles */
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './pages/Home';
import Login from './pages/Login';
import ChangePass from './pages/ChangePass';
import Webber from './components/commonjs/Webber';
import ForgotPass from './pages/ForgotPass';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import ResultView from './pages/ResultView';
import DetailedResultView from './pages/DetailedResultView';
import HolidayList from './pages/HolidayList';
import AdmitCardView from './pages/AdmitCardView';
import ExamsView from './pages/ExamsView';

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
              headerTitle: 'Web',
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
          <Stack.Screen name="Change Password" component={ChangePass} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Attendance" component={Attendance} />
          <Stack.Screen name="Result" component={ResultView} />
          <Stack.Screen name="Detailed Result" component={DetailedResultView} />
          <Stack.Screen name="Admit Card" component={AdmitCardView} />
          <Stack.Screen name="Exams" component={ExamsView} />
          <Stack.Screen name="Holiday" component={HolidayList} />
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
