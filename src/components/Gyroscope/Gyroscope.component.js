import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { Gyroscope as NativeGyroscope } from 'expo';

const initialPosition = { x: 0, y: 0 }
const initialFactor = 25;
const initialState = {
  animatedPosition: new Animated.ValueXY(),
  started: false,
  throwed: false
};

class Gyroscope extends PureComponent {
  position = initialPosition;
  speedFactor = initialFactor;
  state = initialState;

  resetGyro = () => {
    this.setState(initialState);
    this.position = initialPosition;

    this.speedFactor = initialFactor;
  };
  // Hero Mode On:
  trackGyrometer = (eventHandler) => {
    return ({ x, y, z }) => {
      const { started, throwed } = this.state;
      const { onStartSpin, startSpinAnimation } = this.props;

      if (z < -3 && !throwed) {
        this.setState({ started: true });
      }

      if (started && z > 3) {
        onStartSpin();
        this.setState({
          throwed: true,
        }, () => setTimeout(() => {
          startSpinAnimation();
          this.speedFactor = 75;
        }, 200));
      }


      this.position.y += (x * this.speedFactor)
      this.position.x += (y * this.speedFactor)

      eventHandler(this.position)
    }
    // Hero Mode Off:
  }

  componentDidMount() {
    const { animatedPosition } = this.state;
    NativeGyroscope.setUpdateInterval(16);

    NativeGyroscope.addListener(
      this.trackGyrometer(
        Animated.event([
          { x: animatedPosition.x, y: animatedPosition.y }
        ])
      )
    )
  }
  // Hero Mode On:
  render() {
    const { children } = this.props;
    return children({...this.state, resetGyro: this.resetGyro });
  }
  // Hero Mode Off:
}

export default Gyroscope;
