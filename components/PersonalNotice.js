/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const PersonalNotice = props => {
  const [Notice, setNotice] = useState(undefined);
  let keyExtractor = 1;
  const getPNotice = () => {
    fetch(
      'https://raw.githubusercontent.com/subhranshuchoudhury/attendee/main/DB/Notices.json',
    )
      .then(resp => resp.json())
      .then(data => {
        data.forEach(element => {
          if (element.show) {
            setNotice(data);
            return;
          }
        });
      });
  };
  useEffect(() => {
    getPNotice();
  }, []);
  return (
    <>
      <View style={styles.NoticeContainer}>
        {Notice ? (
          <FlatList
            horizontal
            data={Notice}
            renderItem={({item}) =>
              item.show ? (
                <TouchableOpacity onPress={() => props.redirector(item.url)}>
                  <View
                    style={[
                      styles.Notice,
                      // eslint-disable-next-line react-native/no-inline-styles
                      Notice.length > 1 ? {width: 320} : {width: 340},
                    ]}>
                    <Image
                      style={styles.noticeImage}
                      source={{uri: item.imagelink}}
                    />
                  </View>
                </TouchableOpacity>
              ) : null
            }
            keyExtractor={() => keyExtractor++}
          />
        ) : (
          <Image
            style={styles.noticeImage}
            source={require('../images/welcome.jpg')}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  NoticeContainer: {
    marginTop: 30,
    alignSelf: 'center',
    width: '95%',
    height: 100,
    borderRadius: 13,
  },
  noticeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 13,
  },
  Notice: {
    marginRight: 6,
  },
});

export default PersonalNotice;
