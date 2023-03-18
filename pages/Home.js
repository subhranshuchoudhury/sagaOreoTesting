/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// import {View, StyleSheet} from 'react-native';
import HomeProfile from '../components/HomeProfile';
import Notices from '../components/Notices';
import PersonalNotice from '../components/PersonalNotice';

const Home = props => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const verifyUser = async () => {
    const PASS = await AsyncStorage.getItem('PASS');
    const REG_ID = await AsyncStorage.getItem('REG_ID');
    if (!PASS || !REG_ID) {
      props.navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      props.navigation.navigate('Login');
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
        console.error(err);
      });
  };
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
    }
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    props.navigation.navigate('Login');
    console.log('Home.js/ logOut() Done. >> Login.js');
  };

  const redirector = uri => {
    props.navigation.navigate('Webber', {uri});
  };
  return (
    <>
      <StatusBar backgroundColor={'#0099ff'} />
      <HomeProfile />
      <Notices redirector={redirector} />
      <PersonalNotice redirector={redirector} />
    </>
  );
};

const styles = StyleSheet.create({});

export default Home;
