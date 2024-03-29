/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import ShareModule from './commonjs/ShareModule';
ShareModule;

const Notices = props => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [choice, setChoice] = useState(1);
  let key_extractor = 1;
  const fetch_data = url => {
    setIsLoading(true);
    fetch(`https://soanoticesscrapper.vercel.app/${url}`)
      .then(response => response.json())
      .then(final => {
        setData(final);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    setData(undefined);
    switch (choice) {
      case 1:
        fetch_data('en');

        break;
      case 2:
        fetch_data('gn');

        break;
      case 3:
        fetch_data('sn');

        break;
    }
  }, [choice]);
  return (
    <>
      <View style={style.notice_btn_container}>
        <Text
          style={
            choice === 1 ? [style.notice_btn, style.chosen] : [style.notice_btn]
          }
          onPress={() => setChoice(1)}>
          Exam
        </Text>
        <Text
          style={
            choice === 2 ? [style.notice_btn, style.chosen] : [style.notice_btn]
          }
          onPress={() => setChoice(2)}>
          General
        </Text>
        <Text
          style={
            choice === 3 ? [style.notice_btn, style.chosen] : [style.notice_btn]
          }
          onPress={() => setChoice(3)}>
          Student
        </Text>
      </View>
      <FlatList
        ListEmptyComponent={
          <View
            style={
              isLoading
                ? [style.box]
                : [style.box, style.error, {backgroundColor: 'red'}]
            }>
            <Text style={style.item}>
              {isLoading ? (
                <ActivityIndicator color={'#ffff'} size={'large'} />
              ) : (
                'Notice ko prapt karne mai kuch dikkat aarha hai! Ye samasya kuch deer baad thik ho jayega.'
              )}
            </Text>
          </View>
        }
        horizontal
        data={data}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => props.redirector(item.eventLink)}>
            <View style={style.box}>
              <Text style={style.item}>
                {index + 1}. {item.event}
              </Text>
            </View>
            <View style={style.shareContainer}>
              <Text
                onPress={() =>
                  ShareModule(item.s_date + ': ' + item.event, item.eventLink)
                }
                style={[style.box, style.notice_date]}>
                {item.s_date}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  ShareModule(item.s_date + ': ' + item.event, item.eventLink)
                }>
                <Image
                  style={style.shareImage}
                  source={require('../images/icons/icons8-share-64.png')}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={() => key_extractor++}
      />
    </>
  );
};

const style = StyleSheet.create({
  box: {
    backgroundColor: '#0965B6',
    margin: 5,
    width: 200,
    height: 120,
    padding: 8,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    marginBottom: 0.5,
  },
  item: {
    color: '#ffff',
  },
  error: {
    opacity: 0.5,
  },
  notice_btn_container: {
    flexDirection: 'row',
    margin: 6,
  },
  notice_btn: {
    color: 'black',
    padding: 5,
    margin: 4,
    borderRadius: 20,
  },

  chosen: {
    backgroundColor: '#0965B6',
    color: '#ffff',
  },
  notice_date: {
    height: 38,
    marginTop: 0,
    color: '#ffff',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    width: 160,
  },
  shareContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  shareImage: {
    width: 30,
    height: 30,
    margin: 10,
    marginLeft: 0,
    marginTop: 5,
  },
});

export default Notices;
