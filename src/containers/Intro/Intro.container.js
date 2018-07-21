import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, Animated, } from 'react-native';
import AppIntro from 'react-native-app-intro';

import Images from '../../constants/Images.constants';

class Intro extends Component {
  intros = [
    {
      title: 'MJOLNIR',
      content: 'Sahibine ışıltılı güçler ve ölümsüzlük bahşetmek için yaratıldı ama ona sahip olan kişinin amansız bir düşmanı vardır…',
      image: Images.mjolnir,
      subImage: Images.bolt,
      levels: [20, 30, 5, 20, 10],
    },
    {
      title: 'ZAMAN',
      content: 'Mjolnir ve sahibi bir dakikadan fazla birbirinden ayrı kalırsa bahşedilen tüm güçler kaybolur ve sahip zavallı bir ölümlüye dönüşür…',
      image: Images.time,
      subImage: Images.skull,
      levels: [20, 30, 5, 20, 10],
    },
    {
      title: 'İNOVASYON',
      content: 'Neyse ki bir kaç ölümlü genç, bu duruma son vermek için daha önce hiç kimsenin yapmadığı, yapamadığı bir uygulama yapmaya karar verdiler; Mjolnir Sayacı :)',
      image: Images.phone,
      subImage: Images.clockCopy3,
      levels: [20, 30, 5, 20, 10],
    }
  ]

  onFinishInto = () => {
    const { navigation: { navigate } } = this.props;
    navigate('Home');
  }

  renderIntro = (option, i) => {
    return (
      <View key={i} style={styles.wrapper}>
        <View level={10}>
          <Text style={styles.title}>{option.title}</Text>
        </View>
        <View level={15}>
          <Text style={styles.content}>{option.content}</Text>
        </View>
        <View level={8} style={styles.imagesWrapper}>
          <Image source={option.image} />
        </View>
        <View level={option.levels[0]} style={styles[`subImageWrapper0`]}>
          <Animated.Image
            source={option.subImage}
            style={styles[`subImage0`]}
          />
        </View>
        <View level={option.levels[1]} style={styles[`subImageWrapper1`]}>
          <Animated.Image
            source={option.subImage}
            style={styles[`subImage1`]}
          />
        </View>
        <View level={option.levels[2]} style={styles[`subImageWrapper2`]}>
          <Animated.Image
            source={option.subImage}
            style={styles[`subImage2`]}
          />
        </View>
        <View level={option.levels[3]} style={styles[`subImageWrapper3`]}>
          <Animated.Image
            source={option.subImage}
            style={styles[`subImage3`]}
          />
        </View>
        <View level={option.levels[4]} style={styles[`subImageWrapper4`]}>
          <Animated.Image
            source={option.subImage}
            style={styles[`subImage4`]}
          />
        </View>
      </View>
    )
  }

  render() {
    return (
      <AppIntro
        customStyles={introStyle}
        doneBtnLabel="Bitir"
        skipBtnLabel="Atla"
        onSkipBtnClick={this.onFinishInto}
        onDoneBtnClick={this.onFinishInto}
      >
        { this.intros.map(this.renderIntro) }
      </AppIntro>
    );
  }
}

export default Intro;

const introStyle = {
  btnContainer: {
    flex: 1
  },
  dotStyle: {
    width: 10,
    height: 10,
  },
  controllText: {
    fontSize: 18,
    fontFamily: 'proxima-nova-regular',
  }
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#000',
    flex: 1,
    padding: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    fontFamily: 'gelio-retsina'
  },
  content: {
    fontFamily: 'proxima-nova-regular',
    fontSize: 18,
    color: '#fff',
    marginTop: 20,
  },
  imagesWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
  },
  introMiniImages: {
  },
  subImageWrapper0: {
    bottom: '20%',
    left: '20%',
    position: 'absolute',
  },
  subImageWrapper1: {
    bottom: '35%',
    left: '15%',
    position: 'absolute',
  },
  subImageWrapper2: {
    bottom: '40%',
    left: '30%',
    position: 'absolute',
  },
  subImageWrapper3: {
    bottom: '35%',
    right: '15%',
    position: 'absolute',
  },
  subImageWrapper4: {
    bottom: '15%',
    right: '40%',
    position: 'absolute',
  },
  subImage0: {
    width: 33,
    height: 55,
    resizeMode: 'contain'
  },
  subImage1: {
    width: 23,
    height: 38,
    resizeMode: 'contain'
  },
  subImage2: {
    width: 39,
    height: 66,
    resizeMode: 'contain'
  },
  subImage3: {
    width: 33,
    height: 55,
    resizeMode: 'contain'
  },
  subImage4: {
    width: 23,
    height: 38,
    resizeMode: 'contain'
  },
});
