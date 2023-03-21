/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SingleDetailView = props => {
  return (
    <View style={styles.box}>
      <Text style={styles.item}>{props.fname}</Text>
      <Text style={[styles.item, styles.dataItem]}>{props.data}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#ffff',
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
    borderRadius: 12,
    flexWrap: 'wrap',
  },
  item: {
    color: 'black',
  },
  dataItem: {
    fontWeight: 'bold',
  },
});

export default SingleDetailView;
