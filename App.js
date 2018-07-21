import React from 'react';
import { Provider } from 'react-redux';
import { Asset, AppLoading, Font } from 'expo';

import Fonts from './src/constants/Fonts.constants';
import Images from './src/constants/Images.constants';
import createStore from './src/store/configureStore';
import MainNavigation from './src/navigators/mainNavigation';

console.disableYellowBox = true;

const store = createStore();

class App extends React.Component {
  state = {
    isReady: false,
  };

  cacheResourcesAsync = async () => {
    Font.loadAsync(Fonts);
    const cacheImages = Object.keys(Images).map(key => Asset.fromModule(Images[key]).downloadAsync());
    return Promise.all(cacheImages)
  }

  render() {
    const { isReady } = this.state;
    if (!isReady) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.setState({isReady: true})}
          onError={console.warn}
        />
      );
    }

    return (
      <Provider store={store}>
        <MainNavigation/>
      </Provider>
    );
  }
}

export default App;
