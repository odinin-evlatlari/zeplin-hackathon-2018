import React, { Component } from 'react';
import { ImageBackground } from 'react-native';

import Images from '../../constants/Images.constants';

class SplashScreen extends Component {
  componentDidMount () {
    setTimeout(() => this.props.navigation.navigate('Intro'), 900);
  }

  render() {
    return (
      <ImageBackground source={Images.simsek} style={{ flex: 1 }} />
    );
  }
}

export default SplashScreen;
