/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
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
        console.error(err);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    // ShareModule();
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
    console.log('Notices..');
  }, [choice]);
  return (
    <View>
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
                <ActivityIndicator size={'large'} />
              ) : (
                'There is having some issues while fetching the notices from the server! This is a temporary error.'
              )}
            </Text>
          </View>
        }
        horizontal
        data={data}
        renderItem={({item, index}) => (
          <TouchableOpacity onPress={() => console.warn(item.eventLink)}>
            <View style={style.box}>
              <Text style={style.item}>
                {index + 1}. {item.event}
              </Text>
            </View>

            <Text
              onPress={() =>
                ShareModule(item.s_date + ': ' + item.event, item.eventLink)
              }
              style={[style.box, style.notice_date]}>
              {item.s_date}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={() => key_extractor++}
      />
    </View>
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
    // backgroundColor: '#53C5F6',
    borderRadius: 20,
  },

  chosen: {
    backgroundColor: '#53C5F6',
    color: '#ffff',
  },
  notice_date: {
    height: 35,
    marginTop: 0,
    color: '#ffff',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
});

export default Notices;
