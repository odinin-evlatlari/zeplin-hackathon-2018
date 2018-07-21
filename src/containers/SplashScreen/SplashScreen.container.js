import React, { Component } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

class SplashScreen extends Component {

  state = {
    source: require(`../../../assets/simsek.png`)
  }

  componentDidMount () {
    setTimeout(() => this.props.navigation.navigate('Intro'), 900);

    //this.props.navigation.navigate('Intro');
/*   setTimeout(_ => this.setState({
     source : require(`../../../assets/simsek.png`),
   }), 100)*/
/*    setTimeout(_ => this.setState({
      source : require(`../../../assets/loading.png`),
    }), 110)
    setTimeout(_ => this.setState({
      source : require(`../../../assets/simsek.png`),
    }), 150)
    setTimeout(_ => this.setState({
      source : require(`../../../assets/loading.png`),
    }), 160)*/
  }
  render() {
    return (
      <ImageBackground source={this.state.source} style={{flex:1}}>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps)(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
