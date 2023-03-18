/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  Button,
} from 'react-native';

const ChangePass = () => {
  const [show, setShow] = useState(false);
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState(false);
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
      <Modal transparent={false} visible={show} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <Image
              source={require('../images/oreo_loader.gif')}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Processing...</Text>
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
            <Text style={styles.modalText}>
              Yay! Password has been changed.
            </Text>
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

  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default ChangePass;
