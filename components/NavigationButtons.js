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
                style={styles.icon}
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
                style={styles.icon}
                source={require('../images/icons/icons8-test-passed-64.png')}
              />
              <Text style={styles.text}>Result</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.redirector(
              'https://raw.githubusercontent.com/subhranshuchoudhury/attendee/main/DB/holidaylist.jpg',
            )
          }>
          <View style={styles.navBtnHolder}>
            <View style={styles.NavBtn}>
              <Image
                style={styles.icon}
                source={require('../images/icons/icons8-floating-island-beach-64.png')}
              />
              <Text style={styles.text}>Holiday</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.redirector(
              'https://forms.office.com/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAQVuPFJUME1NWTRVUEVBRUE0OFRXUTdGNUc2S0c4VC4u',
            )
          }>
          <View style={styles.navBtnHolder}>
            <View style={styles.NavBtn}>
              <Image
                style={styles.icon}
                source={require('../images/icons/icons8-contact-us-64.png')}
              />
              <Text style={styles.text}>Contact Us</Text>
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
  icon: {
    width: 70,
    height: 70,
  },
});

export default NavigationButtons;
