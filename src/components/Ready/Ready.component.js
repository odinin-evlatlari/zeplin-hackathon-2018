import React, { PureComponent } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Animated } from 'react-native';

import Images from '../../constants/Images.constants';
const randBetween = (minn,maxn) => Math.floor(Math.random() * maxn) + minn

class Ready extends PureComponent {
  state = {
    radial: {
      circleAnimation1: new Animated.Value(0),
      circleAnimation2: new Animated.Value(0),
      circleAnimation3: new Animated.Value(0),
    },
    swingAnimation: new Animated.Value(0),
  };

  componentDidMount () {
    Object.keys(this.state.radial)
          .forEach(key => this.startAnimation(this.state.radial[key], randBetween(1000, 3000)));
    this.startAnimation(this.state.swingAnimation, 3000);
  }

  startAnimation = (animation, duration = 300, delay = 0) => {
    animation.setValue(0);
    Animated.timing(
      animation,
      {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }
    ).start(({ finished }) =>
      finished &&
      this.startAnimation(animation, duration, delay)
    );
  };

  getInterpolation = (animationKey) => {
    const { radial } = this.state;
    return {
      transform: [{
        rotate: radial[animationKey].interpolate({
          inputRange: [0, 1],
          outputRange: ['360deg', '-360deg']
        })
      }]
    }
  }
  getSwing = () => {
    const { swingAnimation } = this.state;
    return {
      transform: [{
        rotate: swingAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: ['360deg', '290deg', '360deg']
        })
      }, {
        translateY: swingAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -100, 0]
        })
      }, {
        translateX: swingAnimation.interpolate({
          inputRange: [0, 0.5, 1],
          outputRange: [0, -40, 0]
        })
      }]
    }
  }
  render() {
    return (
      <ImageBackground source={Images.thor} style={styles.img}>
        <View style={styles.circleWrapper}>
          <Animated.Image
            source={Images.circle1}
            style={[styles.circle1, this.getInterpolation('circleAnimation1')]}
          />
          <Animated.Image
            source={Images.circle2}
            style={[styles.circle2, this.getInterpolation('circleAnimation2')]}
          />
          <Animated.Image
            source={Images.circle3}
            style={[styles.circle3, this.getInterpolation('circleAnimation3')]}
          />
          <Text style={styles.title}>{`MJOLNIR\nHAZIR!`}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.mjornilWrapper}>
            <Image source={Images.flip} style={styles.flip} />
            <Animated.Image
              source={Images.mjolnir}
              style={[styles.mjolnir, this.getSwing() ]}
            />
          </View>
          <Text style={styles.bottomText}>{`Mjornil’i fırlattığınızda\ngeri sayım sayacı çalışmaya başlar…`}</Text>
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
    fontFamily: 'gelio-retsina',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  bottomText: {
    textAlign: 'center',
    fontFamily: 'proxima-nova-regular',
    fontSize: 18,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  bottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 40,
  },
  mjornilWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    left: 20,
  },
  flip: {
    alignSelf: 'center',
  }
});
