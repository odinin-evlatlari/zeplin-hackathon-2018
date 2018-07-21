import React, { Component, Fragment } from 'react';
import { View, StyleSheet, Animated, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo';
import SpriteSheet from 'rn-sprite-sheet';

import Images from '../../constants/Images.constants';
import Gyroscope from '../../components/Gyroscope/Gyroscope.component';
import DeadModal from '../../components/DeadModal/DeadModal.component';
import Ready from "../../components/Ready/Ready.component";
import Timer from "../../components/Timer/Timer.component";

class Home extends Component {
  spinCount = 3;

  state = {
    dead: false,
    scaleAnimatedValue: new Animated.Value(1),
    warningAnimationValue: new Animated.Value(0),
  }

  startSpin = () => {
    if (this.spinCount > 0) {
      this.spinCount--;
      this.sprite && this.sprite.play({
        type: 'spin',
        fps: 6,
        loop: false,
        resetAfterFinish: false,
        onFinish: this.startSpin
      });
    }
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
    this.spinCount = 3;
  };

  startWarningAnimation = (val = 1) => {
    const { warningAnimationValue } = this.state;
    Animated.timing(
      warningAnimationValue,
      {
        toValue: 1,
        useNativeDriver: true
      }
    ).start(({ finished }) => {
      if (finished) {
        this.startWarningAnimation(val === 1 ? 0 : 1)
      }
    })
  }

  getInterpolateWarningStyle = () => {
    const { warningAnimationValue } = this.state;
    return {
      opacity: warningAnimationValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      })
    };
  }

  onDead = () => {
    this.setState({ dead: true });
  }

  render() {
    const { scaleAnimatedValue, dead } = this.state;

    return (
      <Fragment>
        <DeadModal visible={dead} />
        <View style={styles.container}>
          <Gyroscope onStartSpin={this.startSpin} startSpinAnimation={this.startSpinAnimation}>
            {({ started, throwed, animatedPosition, resetGyro }) => !started ? (<Ready/>) : (
              <View style={styles.wrapper}>
                { throwed && (
                  <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back}>
                    <Animated.Image
                      source={Images.warning}
                      style={[styles.warning, this.getInterpolateWarningStyle()]}
                    />
                    <TouchableOpacity
                      style={styles.backButton}
                      onPress={() => this.resetAnimations(resetGyro)}>
                      <Image source={Images.backButton} />
                    </TouchableOpacity>
                    <Timer
                      onStartWarningAnimation={this.startWarningAnimation}
                      onFinish={this.onDead}
                    />
                  </Camera>
                )}
                <Animated.View style={[styles.spriteWrapper, {
                  transform: [
                    {translateX: animatedPosition.x},
                    {translateY: animatedPosition.y},
                    {scale: scaleAnimatedValue},
                  ]
                }]}>
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
              </View>
            )}
          </Gyroscope>
        </View>
      </Fragment>
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
  },
  spriteWrapper: {
    position: 'absolute',
    zIndex: 999,
  },
  warning: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: 10000,
    opacity: 0,
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center'
  }
});
