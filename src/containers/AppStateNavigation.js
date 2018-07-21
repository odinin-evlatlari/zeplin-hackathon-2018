import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { appInitStart } from "./src/actions/appActions";
import MainNavigation from './src/navigators/mainNavigation';

console.disableYellowBox = true;

class AppStateNavigation extends Component {

  componentDidMount () {
    const { appInitStart } = this.props;
    appInitStart();
  }

  render() {
    return (
      <MainNavigation />
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  appInitStart
}, dispatch);

export default connect(null, mapDispatchToProps)(AppStateNavigation);

