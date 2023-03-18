/* eslint-disable prettier/prettier */
import React, {useState} from 'react';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Button,
  Modal,
  StatusBar,
} from 'react-native';

const ForgotPass = props => {
  const [regId, setRegId] = useState('');
  const [phone, setPhone] = useState('');
  const [msg, setMsg] = useState(false);
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
          console.log('Record Does not Exist');
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
          setMsg(true);
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
      <Modal transparent={false} visible={show} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <Image
              source={require('../images/oreo_loader.gif')}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Loading...</Text>
          </View>
        </View>
      </Modal>
      <Modal transparent={false} visible={msg} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <Image
              source={require('../images/green_tick.gif')}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Please check your sms box.</Text>
            <TouchableHighlight>
              <Button onPress={() => setMsg(false)} title="close" />
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

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
              title={regId.length > 0 ? 'Send Sms' : 'oreo'}
            />
          ) : (
            <Button
              onPress={() => stepOne()}
              disabled={regId.length > 0 ? false : true}
              title={regId.length > 0 ? 'Verify' : 'oreo'}
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
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  modalView: {
    backgroundColor: 'skyblue',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 10,
    color: '#ffff',
    textAlign: 'center',
    marginTop: 10,
  },
  modalImage: {
    width: 150,
    height: 150,
  },
});

export default ForgotPass;
