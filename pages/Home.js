/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
import React, {useEffect, useState} from 'react';
import {
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Alert,
  Button,
} from 'react-native';
// import {View, StyleSheet} from 'react-native';
import HomeProfile from '../components/HomeProfile';
import Notices from '../components/Notices';
import PersonalNotice from '../components/PersonalNotice';
import NavigationButtons from '../components/NavigationButtons';

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
          'Server Main Dikkat!',
          'Auto login system mai dikkat arrha hai. Application ko restart karne se error fix ho sakta hai.',
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
        'Kuchh Dikkat Hai!',
        'Server se bad response aa raha hai. Aap application ko restart karo ya phir internet check karo.',
      );
      props.navigation.navigate(addr, {data});
    }
  };
  return (
    <>
      <ScrollView>
        <StatusBar backgroundColor={isError ? 'red' : '#0099ff'} />

        {isAuthenticated ? (
          <HomeProfile isError={isError} nav={nav} />
        ) : (
          <View style={styles.authLoader}>
            <Progress.Bar color="#0965B6" indeterminate={true} width={360} />
          </View>
        )}

        <Notices redirector={redirector} />
        <PersonalNotice redirector={redirector} />

        <View style={styles.navBtnContainer}>
          <ScrollView>
            <NavigationButtons nav={nav} />
          </ScrollView>
        </View>
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
  navBtnContainer: {
    marginTop: 20,
    flexWrap: 'wrap',
    height: 200,
  },
});

export default Home;
