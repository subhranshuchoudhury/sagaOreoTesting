/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import WebView from 'react-native-webview';
const Webber = props => {
  const [load, setLoad] = useState(true);
  return (
    <View style={styles.WebViewContainer}>
      {load ? (
        <>
          <Image
            style={styles.imageLoader}
            source={require('../images/oreo_loader.gif')}
          />
          <Text style={styles.text}>Please wait...</Text>
        </>
      ) : null}
      <WebView
        pullToRefreshEnabled={true}
        onLoadEnd={() => setLoad(false)}
        onLoad={() => setLoad(true)}
        allowsFullscreenVideo={true}
        source={{uri: props.route.params.uri}}
      />
    </View>
  );
};

// const loader = () => {
//   return (

//   );
// };

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
});

export default Webber;
