/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

const HomeProfile = props => {
  const [USER_NAME, setUSER_NAME] = useState('Buddy!');
  const [profileImage, setProfileImage] = useState(undefined);
  const extractLocalData = async () => {
    const response = await AsyncStorage.getItem('USERNAME');
    if (response !== null) {
      setUSER_NAME(response.split(' ')[0]);
    }
  };
  const extractProfImage = async () => {
    const response = await AsyncStorage.getItem('PROFILE_B64');
    if (response !== null) {
      setProfileImage(response);
    } else {
      // setProfileImage(undefined);
    }
  };
  useEffect(() => {
    extractLocalData();
    extractProfImage();
  }, []);
  return (
    <ImageBackground
      style={[{width: '100%', height: '50%'}, styles.backgroundImage]}
      source={require('../images/wave.png')}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.nav('Profile')}>
          <Image
            style={[
              styles.profileImage,
              {
                width: 51,
                height: 51,
                resizeMode: 'contain',
              },
            ]}
            source={
              profileImage
                ? {uri: JSON.parse(profileImage)}
                : require('../images/PROFILE.jpeg')
            }
          />
        </TouchableOpacity>
        <Text style={styles.welcomeUser}>Hi, {USER_NAME || 'OREO'}!</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10,
  },
  welcomeUser: {
    color: '#ffff',
    // textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  profileImage: {
    borderRadius: 50,
    borderColor: '#53C5F6',
    borderWidth: 2,
  },
  backgroundImage: {
    height: 100,
  },
});

export default HomeProfile;
