/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Button,
  StatusBar,
  Alert,
} from 'react-native';

const Login = props => {
  const [regId, setRegId] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const loginActivity = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      username: regId,
      password: pass,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    setShow(true);
    fetch('https://attendie-backend.vercel.app/saga/login', requestOptions)
      .then(response => response.json())
      .then(final => {
        if (final.response.status === 'success') {
          storeData('AUTH_COOKIE', final.COOKIE[0]);
          storeData('USERNAME', final.response.name);
          storeData('REG_ID', regId);
          storeData('PASS', pass);
          console.log('Login.js/ Login Success!');
          setShow(false);
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
          props.navigation.navigate('Home');
        } else {
          setShow(false);
          Alert.alert(
            'Areh Yaar! Bhul gaye?',
            'Apnaa ID & Password check karo galat hai. Agar yaad nahin to forgot password main click karo.',
          );
          console.log('Login.js/ Login Failed!, 401');
        }
      })
      .catch(err => {
        console.error(err);
        setShow(false);
      });
  };

  const getData = async () => {
    try {
      const value_1 = await AsyncStorage.getItem('PASS');
      const value_2 = await AsyncStorage.getItem('REG_ID');
      if (value_1 !== null && value_2 !== null) {
        setRegId(value_2);
        setPass(value_1);
      } else {
        setRegId('');
        setPass('');
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.loginContainer}>
      <StatusBar backgroundColor={'#0099ff'} />
      {show ? (
        <View style={styles.authLoader}>
          <Progress.Bar color="#0099ff" indeterminate={true} width={360} />
        </View>
      ) : null}
      <Image
        style={styles.image}
        source={require('../images/oreo_music.gif')}
      />
      <View style={styles.inputBoxContainer}>
        <Text style={styles.text}>Registration Number</Text>
        <TextInput
          placeholder="2341XXXX23"
          placeholderTextColor={'#bbb'}
          keyboardType="numeric"
          inputMode="numeric"
          onChangeText={setRegId}
          value={regId}
          style={styles.inputBox}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          placeholder="your@pass"
          placeholderTextColor={'#bbb'}
          style={styles.inputBox}
          onChangeText={setPass}
          value={pass}
        />
        <TouchableHighlight style={styles.loginButton}>
          <Button
            onPress={() => loginActivity()}
            disabled={regId.length > 0 && pass.length > 0 ? false : true}
            title={regId.length > 0 && pass.length > 0 ? 'login' : 'Welcome'}
          />
        </TouchableHighlight>

        <Text
          onPress={() => props.navigation.navigate('ForgotPassword')}
          style={styles.forgotPass}>
          forgot password?
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    height: '100%',
  },
  text: {
    color: 'black',
    margin: 6,
  },
  image: {
    width: '100%',
    height: '40%',
  },
  inputBoxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    borderWidth: 1,
    color: '#2D2727',
    fontSize: 20,
    width: '70%',
    textAlign: 'center',
    borderRadius: 20,
  },
  loginButton: {
    width: '70%',
    marginTop: 30,
  },
  forgotPass: {
    color: 'black',
    marginTop: 30,
  },
});

export default Login;
