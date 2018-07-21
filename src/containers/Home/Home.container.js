import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';
import { Camera } from 'expo';
import SpriteSheet from 'rn-sprite-sheet';

import Gyroscope from '../../components/Gyroscope/Gyroscope.component';
import Ready from "../../components/Ready/Ready.component";

class Home extends Component {
  state = {
    scaleAnimatedValue: new Animated.Value(1),
    isFinish: false,
  }

  componentDidMount () {
    this.startSpin()
  }

  startSpin = () => {
    this.sprite && this.sprite.play({
      type: 'spin',
      fps: 6,
      loop: false,
      resetAfterFinish: false
    });
  };

  startSpinAnimation = () => {
    const { scaleAnimatedValue } = this.state;
    Animated.timing(
      scaleAnimatedValue,
      {
        toValue: 0.25,
        duration: 2000,
        userNativeDriver: true
      }
    ).start(({ finished }) => finished && this.setState({ isFinish: finished }));
  };

  resetAnimations = (resetGyro) => {
    const { scaleAnimatedValue } = this.state;
    scaleAnimatedValue.setValue(1);
    resetGyro();
  };

  render() {
    const { scaleAnimatedValue, isFinish } = this.state;

    return (
      <View style={styles.container}>
        <Gyroscope onStartSpin={this.startSpin} startSpinAnimation={this.startSpinAnimation}>
          {({ started, throwed, animatedPosition, resetGyro }) => !started ? (<Ready/>) : (
            <View style={styles.wrapper}>
              { throwed && <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} /> }
              <Animated.View style={{
                position: 'absolute',
                zIndex: 999,
                transform: [
                  {translateX: animatedPosition.x},
                  {translateY: animatedPosition.y},
                  {scale: scaleAnimatedValue},
                ]
              }}>
              <View style={{ opacity: throwed ? 1 : 0 }}>
                  <SpriteSheet
                    ref={ref => this.sprite = ref}
                    source={require('../../../assets/sprite1.png')}
                    columns={4}
                    rows={2}
                    height={200}
                    width={200}
                    animations={{
                      spin: [...Array(8).keys()],
                    }}
                  />
                </View>
              </Animated.View>
              {isFinish && (
                <TouchableOpacity onPress={() => this.resetAnimations(resetGyro)}>
                  <Text>Yakala</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </Gyroscope>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    width: '100%',
    height: '100%'
  }
});
