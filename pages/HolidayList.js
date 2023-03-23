/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import * as Progress from 'react-native-progress';

const HolidayList = () => {
  return (
    <View>
      <Image
        style={styles.img}
        source={{
          uri: 'https://raw.githubusercontent.com/subhranshuchoudhury/attendee/main/DB/holidaylist.jpg',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 340,
    height: 600,
    alignSelf: 'center',
  },
});

export default HolidayList;
