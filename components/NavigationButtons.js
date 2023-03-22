/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';

const NavigationButtons = props => {
  return (
    <>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => props.nav('Attendance')}>
          <View style={styles.navBtnHolder}>
            <View style={styles.NavBtn}>
              <Image
                source={require('../images/icons/icons8-attendance-64.png')}
              />
              <Text style={styles.text}>Attendance</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.nav('Result')}>
          <View style={styles.navBtnHolder}>
            <View style={styles.NavBtn}>
              <Image
                source={require('../images/icons/icons8-test-passed-64.png')}
              />
              <Text style={styles.text}>Result</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  NavBtn: {
    height: 80,
    width: 80,
    margin: 10,
    alignItems: 'center',
  },
  text: {
    color: 'black',
  },
  navBtnHolder: {
    alignItems: 'center',
  },
  mainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default NavigationButtons;
