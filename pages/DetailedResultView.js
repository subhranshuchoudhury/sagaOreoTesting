/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Alert, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const DetailedResultView = props => {
  const [IsLoading, setIsLoading] = useState(false);
  const [STD_RESULT, setSTD_RESULT] = useState([]);
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
    await fetch(
      `https://attendie-backend.vercel.app/rstdtl/${KEY}/${props.route.params.styno}`,
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        storeData('D_STD_RESULT', JSON.stringify(data));
        setSTD_RESULT(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        onError();
        setIsLoading(false);
      });
  };
  useEffect(() => {
    getMyStringValue('D_STD_RESULT').then(val => {
      if (val) {
        setSTD_RESULT(JSON.parse(val));
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
    <View>
      {IsLoading ? (
        <View style={styles.progressIndicator}>
          <Progress.Bar color="#0099ff" indeterminate={true} width={360} />
        </View>
      ) : null}
      <FlatList
        ListEmptyComponent={
          IsLoading ? (
            <View style={styles.attendance}>
              <Text style={[styles.text, styles.centerView]}>Loading...</Text>
            </View>
          ) : null
        }
        data={STD_RESULT.Semdata}
        renderItem={({item}) => (
          <View style={styles.mainContainer}>
            <View style={styles.heading}>
              <Text style={[styles.text, styles.mainText]}>
                {item.subjectdesc}
              </Text>
              <Text style={[styles.text, styles.mainText]}>{item.grade}</Text>
            </View>
            <View style={styles.heading}>
              <Text style={styles.text}>{item.subjectcode}</Text>
              <Text style={styles.text}>Credit: {item.earnedcredit}</Text>
            </View>
          </View>
        )}
        keyExtractor={() => key_extractor++}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    margin: 10,
    borderWidth: 2,
    borderColor: '#0099ff',
    padding: 5,
  },
  text: {
    color: 'black',
  },
  centerView: {alignSelf: 'center', margin: 20},
  mainText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  heading: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  progressIndicator: {
    alignSelf: 'center',
  },
});

export default DetailedResultView;
