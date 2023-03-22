/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';
const Attendance = () => {
  const [IsLoading, setIsLoading] = useState(false);
  const [AttendanceData, setAttendanceData] = useState([]);
  let key_extractor = 1;
  const getMyStringValue = async value => {
    try {
      return await AsyncStorage.getItem(value);
    } catch (e) {
      console.error(e);
    }
  };

  const onError = () => {
    Alert.alert(
      'Arehh Yaarr!',
      'Kuch error hain server main sayad, Application ko reopen karo.',
    );
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async KEY => {
    setIsLoading(true);
    await fetch(`https://attendie-backend.vercel.app/attendinfo/${KEY}`)
      .then(response => response.json())
      .then(data => {
        if (data.griddata?.length > 0) {
          storeData('ATTENDANCE_DATA', JSON.stringify(data.griddata));
          setAttendanceData(data.griddata);
        } else {
          onError();
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        onError();
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getMyStringValue('ATTENDANCE_DATA').then(val => {
      if (val) {
        setAttendanceData(JSON.parse(val));
      }
    });
    getMyStringValue('AUTH_COOKIE').then(val => {
      if (val) {
        getData(val.split(';')[0].trim());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.attendanceContainer}>
      {IsLoading ? (
        <View style={styles.progressIndicator}>
          <Progress.Bar color="#0099ff" indeterminate={true} width={360} />
        </View>
      ) : null}
      <FlatList
        ListEmptyComponent={
          IsLoading ? (
            <View style={styles.attendance}>
              <Text style={[styles.text, styles.textBold, styles.padding]}>
                Loading...
              </Text>
            </View>
          ) : (
            <View style={styles.attendance}>
              <Text style={[styles.text, styles.textBold, styles.padding]}>
                Your Attendance not yet updated, Or the server facing issues
                while fetching your data, this must be a temporary issue. Try
                again after sometime.If error persist contact developer.
              </Text>
            </View>
          )
        }
        data={AttendanceData}
        renderItem={({item, index}) => (
          <View style={styles.attendance}>
            <View style={styles.sub}>
              <Text style={[styles.text, styles.sub, styles.textBold]}>
                {item.subject}
              </Text>
              <Text style={[styles.text, styles.sub, styles.textBold]}>
                {item.subjectcode}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <Progress.Bar
                progress={item.TotalAttandence / 100}
                color={item.TotalAttandence > 74 ? '#0099ff' : 'red'}
                animated={true}
                width={310}
              />
              <Text style={[styles.text, styles.textBold]}>
                {item.TotalAttandence}%
              </Text>
            </View>
            <View style={styles.dAttendance}>
              <Text style={styles.text}>
                Lecture Attendance:{' '}
                <Text style={styles.textBold}>{item.Latt}</Text>
              </Text>
              <Text style={styles.text}>
                Practical Attendance:{' '}
                <Text style={styles.textBold}>{item.Patt}</Text>
              </Text>
              <Text style={styles.text}>
                Sync: <Text style={styles.textBold}>{item.lastupdatedon}</Text>
              </Text>
            </View>
          </View>
        )}
        keyExtractor={() => key_extractor++}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  attendance: {
    borderWidth: 1,
    borderColor: '#0099ff',
    margin: 5,
    borderRadius: 13,
  },
  attendanceContainer: {
    alignSelf: 'center',
  },
  text: {
    color: 'black',
    // fontWeight: 'bold',
  },
  textBold: {
    fontWeight: 'bold',
  },
  sub: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  progressBar: {
    alignSelf: 'center',
  },
  dAttendance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
    flexWrap: 'wrap',
  },
  padding: {
    padding: 20,
  },
});

export default Attendance;
