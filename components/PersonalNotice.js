/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image, Touchab, TouchableOpacity} from 'react-native';

const PersonalNotice = props => {
  return (
    <View style={styles.NoticeContainer}>
      <TouchableOpacity
        onPress={() =>
          props.redirector(
            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          )
        }>
        <Image
          style={styles.noticeImage}
          source={require('../images/OIP.jpeg')}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  NoticeContainer: {
    marginTop: 30,
    alignSelf: 'center',
    width: '95%',
    height: 100,
    backgroundColor: '#0099ff',
    borderRadius: 13,
  },
  noticeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
});

export default PersonalNotice;
