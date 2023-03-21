/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';

import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Button,
} from 'react-native';
import SingleDetailView from './SingleDetailView';
const Profile = props => {
  const [USER_DATA, setUSER_DATA] = useState(undefined);
  const [ProfileData, SetProfileData] = useState(undefined);
  const [loader, setLoader] = useState(true);
  const [show, setShow] = useState(false);
  const [profileLink, setProfileLink] = useState('');
  const getMyStringValue = async value => {
    try {
      return await AsyncStorage.getItem(value);
    } catch (e) {
      // read error
      console.error(e);
    }
  };

  const setImageLink = () => {
    storeData('PROFILE_IMG_URI', profileLink);
    setShow(false);
    Alert.alert('Profile has been updated.', 'Reopen the page to see effect.');
  };

  const getData = async KEY => {
    setLoader(true);
    await fetch(`https://attendie-backend.vercel.app/info/${KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.detail[0].name) {
          setUSER_DATA(data);
          storeData('USER_DATA', JSON.stringify(data));
          setLoader(false);
        }
      })
      .catch(err => {
        console.error(err);
        setLoader(false);
      });
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  const getProfileImage = async URI => {
    setLoader(true);
    const options = {
      method: 'GET',
    };
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      SetProfileData(base64data);
      storeData('PROFILE_B64', JSON.stringify(base64data));
      setLoader(false);
    };
    fetch(URI, options)
      .then(response => response.blob())
      .then(response => {
        reader.readAsDataURL(response);
      })
      .catch(err => {
        console.error(err);
        setLoader(false);
      });
  };

  const logOut = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.log(e);
    }
    SetProfileData(undefined);
    props.navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
    props.navigation.navigate('Login');
    console.log('Home.js/ logOut() Done. >> Login.js');
  };

  useEffect(() => {
    getMyStringValue('PROFILE_B64').then(val => {
      if (val) {
        SetProfileData(JSON.parse(val));
      }
    });
    getMyStringValue('USER_DATA').then(val => {
      if (val) {
        setUSER_DATA(JSON.parse(val));
      }
    });
    getMyStringValue('AUTH_COOKIE').then(val => {
      if (val) {
        getData(val.split(';')[0].trim());
      }
    });
    getMyStringValue('PROFILE_IMG_URI').then(val => {
      if (val) {
        getProfileImage(val);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Modal transparent={false} visible={show} animationType="slide">
        <View style={styles.centerView}>
          <View style={styles.modalView}>
            <TextInput
              onChangeText={text => setProfileLink(text)}
              style={styles.textInput}
              placeholder="Enter image url/link.."
            />
            <View style={[styles.buttonContainer, styles.modalBtn]}>
              <Button onPress={() => setImageLink()} title="SET" />
              <Button onPress={() => setShow(false)} title="CANCEL" />
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.imageHolder}>
        <TouchableOpacity onPress={() => setShow(true)}>
          {ProfileData ? (
            <Image
              style={styles.profileImage}
              source={{
                uri: ProfileData,
              }}
            />
          ) : (
            <Image
              style={styles.profileImage}
              source={require('../images/PROFILE.jpeg')}
            />
          )}
        </TouchableOpacity>
      </View>
      {USER_DATA ? (
        <Text style={styles.text}>{USER_DATA.detail[0].name}</Text>
      ) : (
        <Text style={styles.text}>...</Text>
      )}

      {loader ? (
        <View style={styles.progressIndicator}>
          <Progress.Bar color="#0099ff" indeterminate={true} width={360} />
        </View>
      ) : null}

      {USER_DATA ? (
        <View style={styles.details}>
          <ScrollView>
            <SingleDetailView
              fname={'REGISTRATION ID'}
              data={USER_DATA.detail[0].enrollmentno}
            />
            <SingleDetailView
              fname={'EMAIL ID'}
              data={USER_DATA.detail[0].semailid}
            />
            <SingleDetailView
              fname={'PHONE'}
              data={USER_DATA.detail[0].scellno}
            />
            <SingleDetailView
              fname={'PARENT PHONE'}
              data={USER_DATA.detail[0].pcellno}
            />
            <SingleDetailView
              fname={'BRANCH'}
              data={USER_DATA.detail[0].branchdesc}
            />
            <SingleDetailView
              fname={'SECTION'}
              data={USER_DATA.detail[0].sectioncode}
            />
            <SingleDetailView
              fname={'DOB'}
              data={USER_DATA.detail[0].dateofbirth}
            />
            <SingleDetailView
              fname={'FATHER'}
              data={USER_DATA.detail[0].fathersname}
            />
            <SingleDetailView
              fname={'MOTHER'}
              data={USER_DATA.detail[0].mothersname}
            />
            <SingleDetailView
              fname={'PROGRAM'}
              data={USER_DATA.detail[0].programdesc}
            />
            <SingleDetailView
              fname={'GENDER'}
              data={USER_DATA.detail[0].gender}
            />
            <SingleDetailView
              fname={'A/C NO'}
              data={USER_DATA.detail[0].accountno}
            />
            <SingleDetailView
              fname={'BANK NAME'}
              data={USER_DATA.detail[0].bankname}
            />
            <SingleDetailView
              fname={'BLOOD GROUP'}
              data={USER_DATA.detail[0].bloodgroup}
            />
            <SingleDetailView
              fname={'ADDRESS-I'}
              data={USER_DATA.detail[0].caddress1}
            />
            <SingleDetailView
              fname={'ADDRESS-II'}
              data={USER_DATA.detail[0].caddress2}
            />
            <SingleDetailView
              fname={'ADDRESS-III'}
              data={USER_DATA.detail[0].caddress3}
            />
            <SingleDetailView
              fname={'CITY'}
              data={USER_DATA.detail[0].ccityname}
            />
            <SingleDetailView
              fname={'DISTRICT'}
              data={USER_DATA.detail[0].cdistrict}
            />
            <SingleDetailView
              fname={'PIN CODE'}
              data={USER_DATA.detail[0].cpin}
            />
            <SingleDetailView
              fname={'STATE'}
              data={USER_DATA.detail[0].cstatename}
            />
          </ScrollView>
        </View>
      ) : null}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btn}>
          <Button onPress={() => logOut()} title={'logout'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Button
            onPress={() => props.navigation.navigate('ChangePassword')}
            title={'change password'}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    marginTop: 20,
    fontSize: 19,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 170,
    height: 170,
    margin: 20,
    borderRadius: 90,
    borderWidth: 5,
    borderColor: '#0099ff',
  },
  imageHolder: {
    alignSelf: 'center',
  },
  details: {
    marginTop: 20,
    backgroundColor: '#bbbb',
    borderRadius: 12,
    height: 320,
    width: '90%',
    alignSelf: 'center',
  },
  progressIndicator: {
    marginTop: 5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 20,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  modalView: {
    backgroundColor: 'skyblue',
    width: '70%',
    padding: 10,
    borderRadius: 10,
    shadowColor: 'black',
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    color: '#ffff',
    textAlign: 'center',
    marginTop: 10,
  },
  textInput: {
    color: 'black',
  },
  modalBtn: {
    margin: 1,
  },
});

export default Profile;
