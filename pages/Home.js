/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import React, {useEffect, useState} from 'react';
import {View, StatusBar, ScrollView, StyleSheet, Alert} from 'react-native';
// import {View, StyleSheet} from 'react-native';
import HomeProfile from '../components/HomeProfile';
import Notices from '../components/Notices';
import PersonalNotice from '../components/PersonalNotice';

const Home = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);
  const verifyUser = async () => {
    const PASS = await AsyncStorage.getItem('PASS');
    const REG_ID = await AsyncStorage.getItem('REG_ID');
    if (!PASS || !REG_ID) {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      props.navigation.navigate('Login');
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const raw = JSON.stringify({
      username: REG_ID,
      password: PASS,
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    let resp = fetch(
      'https://attendie-backend.vercel.app/saga/login',
      requestOptions,
    );
    resp
      .then(response => response.json())
      .then(response => {
        if (response.response.status === 'success') {
          storeData('AUTH_COOKIE', response.COOKIE[0]);
          storeData('USERNAME', response.response.name);
          setIsAuthenticated(true);
          console.log('Home.js/ Authenticated!');
        } else {
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
          props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.log(err);
        setIsAuthenticated(true);
        setIsError(true);
        Alert.alert(
          'Server Error!',
          'We faced some issues while auto login. This must be a temporary issue.',
        );
      });
  };
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
      // console.error(e);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const redirector = uri => {
    props.navigation.navigate('Webber', {uri});
  };
  const nav = (addr, data) => {
    if (!isError) {
      props.navigation.navigate(addr, {data});
    } else {
      Alert.alert(
        'Authentication Failed!',
        'This is a temporary error response from the server. Reopening the app may fix the issue.',
      );
    }
  };
  return (
    <>
      <ScrollView>
        <StatusBar backgroundColor={isError ? 'red' : '#0099ff'} />

        {isAuthenticated ? (
          <HomeProfile nav={nav} />
        ) : (
          <View style={styles.authLoader}>
            <Progress.Bar color="#0965B6" indeterminate={true} width={360} />
          </View>
        )}

        <Notices redirector={redirector} />
        <PersonalNotice redirector={redirector} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  NoticeContainer: {
    marginTop: 25,
  },
  authLoader: {
    margin: 25,
    alignSelf: 'center',
  },
});

export default Home;
