import { createStackNavigator } from 'react-navigation';
import SplashScreen from '../containers/SplashScreen/SplashScreen.container';
import Intro from "../containers/Intro/Intro.container";
import Home from "../containers/Home/Home.container";

export default createStackNavigator({

  SplashScreen: {
    screen: SplashScreen
  },
  Intro: {
    screen: Intro
  },
  Home: {
    screen: Home
  },
}, {
  navigationOptions: {
    header: null
  }
});
