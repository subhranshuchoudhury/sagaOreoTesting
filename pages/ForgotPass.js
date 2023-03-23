/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import * as Progress from 'react-native-progress';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Button,
  Alert,
  StatusBar,
} from 'react-native';

const ForgotPass = props => {
  const [regId, setRegId] = useState('');
  const [phone, setPhone] = useState('');
  const [show, setShow] = useState(false);
  const [levelOne, setLevelOne] = useState(false);

  const stepOne = async () => {
    setShow(true);
    fetch(`https://attendie-backend.vercel.app/forgetpass/${regId}`)
      .then(response => response.json())
      .then(final => {
        setShow(false);
        console.log(final);
        if (final.studentdata.SUCCESS) {
          setPhone(regId);
          setRegId(final.studentdata.Data.mobileno);
          setLevelOne(true);
        } else {
          Alert.alert('Galat ID!', 'Apna registration number recheck karo!');
        }
      })
      .catch(err => {
        console.error(err);
        setShow(false);
      });
  };

  const stepTwo = async () => {
    setShow(true);
    fetch(
      `https://attendie-backend.vercel.app/forgetpassfinal/${phone}/${regId}`,
    )
      .then(response => response.json())
      .then(final => {
        setShow(false);
        if (final.studentdata.SUCCESS) {
          Alert.alert(
            'SMS Inbox Check Karo!',
            'Aapna sms inbox main SOA ke taraf se ek sms aya hoga, Usme ID & Password hai.',
          );
          props.navigation.navigate('Login');
        }
      })
      .catch(err => {
        console.error(err);
        setShow(false);
      });
  };

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
        {levelOne ? (
          <Text style={styles.text}>Phone Number</Text>
        ) : (
          <Text style={styles.text}>Registration Number</Text>
        )}

        <TextInput
          placeholder="2341XXXX23"
          placeholderTextColor={'#bbb'}
          keyboardType="numeric"
          inputMode="numeric"
          onChangeText={setRegId}
          value={regId}
          editable={levelOne ? false : true}
          style={styles.inputBox}
        />

        <TouchableHighlight style={styles.loginButton}>
          {levelOne ? (
            <Button
              onPress={() => stepTwo()}
              disabled={regId.length > 0 ? false : true}
              title={regId.length > 0 ? 'Send Sms' : 'Hola!'}
            />
          ) : (
            <Button
              onPress={() => stepOne()}
              disabled={regId.length > 0 ? false : true}
              title={regId.length > 0 ? 'Verify' : 'Hola!'}
            />
          )}
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

export default ForgotPass;
