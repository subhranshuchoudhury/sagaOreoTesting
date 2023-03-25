/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import * as Progress from 'react-native-progress';

import WebView from 'react-native-webview';
const Webber = props => {
  const [load, setLoad] = useState(true);
  return (
    <View style={styles.WebViewContainer}>
      {load ? (
        <>
          <View style={styles.loader}>
            <Progress.Bar color="#0099ff" indeterminate={true} width={360} />
            <Text style={styles.text}>Please wait...</Text>
          </View>
        </>
      ) : null}
      <WebView
        onError={() =>
          Alert.alert(
            'Sayad Internet Nahin Hai!',
            'Aapka internet connection mai dikkat hai. Application ko re-open karo sayad issue fix ho jaye.',
          )
        }
        pullToRefreshEnabled={true}
        onLoadEnd={() => setLoad(false)}
        onLoad={() => setLoad(true)}
        allowsFullscreenVideo={true}
        source={{uri: props.route.params.uri}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#bbb',
    fontSize: 15,
    margin: 30,
    alignSelf: 'center',
  },
  WebViewContainer: {
    height: '100%',
  },
  imageLoader: {
    height: '30%',
    width: '100%',
  },
  loader: {
    alignSelf: 'center',
  },
});

export default Webber;
