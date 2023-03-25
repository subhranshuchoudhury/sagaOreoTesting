/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
// import {decode as atob, encode as btoa} from 'base-64';
const ExamsView = () => {
  const [pdfUrl, setPdfUrl] = useState(null);

  const getCert = () => {
    var myHeaders = new Headers();
    myHeaders.append('Cookie', '');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      examid: 'ITERRETD2209A0000001',
      regid: 'ITERRETD2209A0000001',
      exameventid: 'ITEREXEV2303A0000001',
      studentname: '',
      enrollmentno: '',
      programdesc: 'Bachelor of Technology',
      branchdesc: 'Computer Science and Engineering',
      lateralentry: 'N',
    });

    var requestOptions = {
      method: 'POST',
      responseType: 'blob',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(
      'http://115.240.101.71:8282/CampusPortalSOA/downExameSchedulepdf',
      requestOptions,
    )
      .then(response => {
        // check the response status
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // convert the response into text
      })

      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    // getCert();
  }, []);
  return (
    <View style={{flex: 1}}>
      {pdfUrl ? <View></View> : <ActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({});

export default ExamsView;
