/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import * as Progress from 'react-native-progress';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  Button,
  Alert,
} from 'react-native';

const ChangePass = props => {
  const [show, setShow] = useState(false);
  const [pass, setPass] = useState('');
  const changePassActivity = async () => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      cookie: await AsyncStorage.getItem('AUTH_COOKIE'),
      pass: pass,
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    setShow(true);
    fetch('https://attendie-backend.vercel.app/changepassword', requestOptions)
      .then(response => response.json())
      .then(final => {
        if (final.Success === 'Password Updated Successfully') {
          setShow(false);
          Alert.alert(
            'Password change ho chukka hai!',
            'Aapko phirse login karna padega.',
          );
          logOut();
        } else {
          Alert.alert(
            'Kuch dikkat hai!',
            'Server se invalid response prapt hua, application ko restart karo sayad thik hojayega.',
          );
        }
      })
      .catch(err => {
        console.log(err);
        setShow(false);
        Alert.alert('Server mai kuch samasya hai!', 'Kuch deer baad try karo.');
      });
  };
  const logOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    props.navigation.navigate('Login');
    console.log('ChangePass.js/ logOut() Done. >> Login.js');
  };
  return (
    <View style={styles.loginContainer}>
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
        <Text style={styles.text}>New Password</Text>
        <TextInput
          placeholder="new@pass"
          placeholderTextColor={'#bbb'}
          style={styles.inputBox}
          onChangeText={setPass}
          value={pass}
        />
        <TouchableHighlight style={styles.loginButton}>
          <Button
            onPress={() => changePassActivity()}
            disabled={pass.length > 0 ? false : true}
            title={pass.length > 0 ? 'Change password' : 'oreo'}
          />
        </TouchableHighlight>
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
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '50%',
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
});

export default ChangePass;
