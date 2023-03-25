/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Progress from 'react-native-progress';

const ResultView = props => {
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
    await fetch(`https://attendie-backend.vercel.app/stdrst/${KEY}`)
      .then(response => response.json())
      .then(data => {
        storeData('STD_RESULT', JSON.stringify(data));
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
    getMyStringValue('STD_RESULT').then(val => {
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
              <Text style={styles.text}>Loading...</Text>
            </View>
          ) : null
        }
        data={STD_RESULT.info}
        renderItem={({item}) => (
          <View style={styles.mainContainer}>
            <View style={styles.heading}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.enrollmentno}</Text>
            </View>
            <Text style={styles.text}>Branch: {item.branchdesc}</Text>
            <Text style={styles.text}>Program: {item.programdesc}</Text>
          </View>
        )}
        keyExtractor={() => key_extractor++}
      />
      <FlatList
        data={STD_RESULT.data}
        ListEmptyComponent={
          !IsLoading ? (
            <View style={styles.errorText}>
              <Text style={[styles.text, styles.errorInnerText]}>
                Abhitak aapka koi bhi result publish nahin hua hai. Aur sayad
                server main kuch problem hai. Application ko reopen karnese
                error fix ho sakta hai.
              </Text>
            </View>
          ) : null
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Detailed Result', {
                styno: item.stynumber,
              })
            }>
            <View style={styles.mainContainer}>
              <View style={styles.heading}>
                <Text style={[styles.text, styles.mainText]}>
                  {item.Semesterdesc}
                </Text>
                <Text style={[styles.text, styles.mainText]}>{item.sgpaR}</Text>
              </View>
              <Text style={styles.text}>Period: {item.examperiodfrom}</Text>
              <Text style={styles.text}>Credit: {item.totalearnedcredit}</Text>
              <Text style={styles.text}>Fail: {item.fail}</Text>
              <View style={styles.heading}>
                <Text style={styles.text}>De-active: {item.deactive}</Text>
                <Text style={styles.text}>Detailed Result</Text>
              </View>
            </View>
          </TouchableOpacity>
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
  mainText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  heading: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  errorText: {
    backgroundColor: 'red',
    margin: 10,
    padding: 5,
  },
  errorInnerText: {
    color: '#ffff',
  },
  progressIndicator: {
    alignSelf: 'center',
  },
});

export default ResultView;
