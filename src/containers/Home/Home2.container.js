import React, { Component } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import SpriteSheet from 'rn-sprite-sheet';

import Gyroscope from '../../components/Gyroscope/Gyroscope.component';

class Home2 extends Component {

  startSpin = () => {
    this.sprite.play({
      type: 'spin',
      fps: 6,
      loop: true,
      resetAfterFinish: true
    });
  };

  componentDidMount () {
    this.startSpin();
  }

  render() {
    return (
      <View style={styles.container}>
        <SpriteSheet
          ref={ref => this.sprite = ref}
          source={require('../../../assets/sprite1.png')}
          columns={4}
          rows={2}
          height={200}
          width={200}
          imageStyle={{ marginTop: -1 }}
          animations={{
            spin: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          }}
        />
      </View>
    );
  }
}

export default Home2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
