import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Animated, Easing } from 'react-native';

import Images from '../../constants/Images.constants';

const randBetween = (minn,maxn) => Math.floor(Math.random() * maxn) + minn

class Ready extends PureComponent {

  state = {
    circleAnimation1: new Animated.Value(0),
    circleAnimation2: new Animated.Value(0),
    circleAnimation3: new Animated.Value(0),
  };

  componentDidMount () {
    Object.keys(this.state).map(key => this.startAnimation(key, randBetween(1000,3000)));
  }

  startAnimation = (animationKey, duration = 300, delay = 0) => {
    this.state[animationKey].setValue(0);
    Animated.timing(
      this.state[animationKey],
      {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }
    ).start(({ finished }) => finished && this.startAnimation(animationKey, duration, delay))
  };

  getInterpolation = (animationKey) => {
    return {
      transform: [{
        rotate: this.state[animationKey].interpolate({
          inputRange: [0, 1],
          outputRange: ['360deg', '-360deg']
        })
      }]
    }
  }

  render() {
    return (
      <ImageBackground source={Images.thor} style={styles.img}>
        <View style={styles.circleWrapper}>
          <Animated.Image source={Images.circle1} style={[styles.circle1, this.getInterpolation('circleAnimation1')]} />
          <Animated.Image source={Images.circle2} style={[styles.circle2, this.getInterpolation('circleAnimation2')]} />
          <Animated.Image source={Images.circle3} style={[styles.circle3, this.getInterpolation('circleAnimation3')]} />
          <Text style={styles.title}>{`MJOLNIR\nHAZIR!`}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.mjornilWrapper}>

          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default Ready;

const circleStyle = { position: 'absolute' }
const styles = StyleSheet.create({
  img: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    ...circleStyle,
    width: 270,
    height: 270,
    resizeMode: 'contain'
  },
  circle2: {
    ...circleStyle,
    width: 220,
    height: 220,
    resizeMode: 'contain'
  },
  circle3: {
    width: 235,
    height: 235,
    resizeMode: 'contain',
    ...circleStyle
  },
  circleWrapper: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 39,
    color: '#fff',
    fontFamily: 'gelio-retsina'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  mjornilWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
