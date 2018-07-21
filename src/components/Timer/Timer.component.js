import React, { PureComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Timer extends PureComponent {
  state = {
    time: 60
  }

  componentDidMount () {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  startInterval = () => {
    this.intervalID = setInterval(this.countdown, 1000);
  };

  countdown = () => {
    const { onFinish, onStartWarningAnimation } = this.props;
    this.setState(prevState => {
      if (prevState.time <= 0) {
        clearInterval(this.intervalID);
        onFinish && onFinish();
        return {
          time: 0
        }
      }
      if (prevState.time <= 10) {
        onStartWarningAnimation && onStartWarningAnimation()
      }
      return {
        time: prevState.time - 1
      }
    })
  };

  render() {
    const { time } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.time}>{time}</Text>
      </View>
    )
  }
}

export default Timer;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    top: 10,
  },
  time: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 54,
    color: '#fff',
    fontFamily: 'proxima-nova-regular',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 2},
    textShadowRadius: 10,
  }
});
