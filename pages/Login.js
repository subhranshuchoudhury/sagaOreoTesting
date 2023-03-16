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
} from 'react-native';

const Login = () => {
  const [regId, setRegId] = useState('');
  const [pass, setPass] = useState('');
  return (
    <View style={styles.loginContainer}>
      <Image
        style={styles.image}
        source={require('../images/dancing_oreo.gif')}
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
            onPress={() => console.warn('Tapped')}
            disabled={regId.length > 0 && pass.length > 0 ? false : true}
            title={regId.length > 0 && pass.length > 0 ? 'login' : 'oreo'}
          />
        </TouchableHighlight>
        <Text
          onPress={() => console.warn('forgot pass')}
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
    height: '50%',
  },
  inputBoxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    borderBottomWidth: 2,
    color: '#2D2727',
    fontWeight: 'bold',
    fontSize: 20,
    width: '70%',
    textAlign: 'center',
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
