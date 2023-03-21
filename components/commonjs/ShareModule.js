/* eslint-disable prettier/prettier */
import Share from 'react-native-share';

const ShareModule = (msg, link) => {
  const options = {
    message: msg + '\n\n~Download the app: Oreo Saga',
    url: link,
  };
  Share.open(options)
    .then(res => console.log(res))
    .catch(err => console.log(err));
};

export default ShareModule;
