import { fork, take, all } from 'redux-saga/effects';

import COMMON from '../constants/Common.constants';
import appInitSaga from './appInitSaga';

export default function* rootSaga() {
  const isFinish = true;
  yield fork(appInitSaga);
  while (isFinish) {
    yield take(COMMON.INIT_FINISH);
    yield all([
      // ### INJECTED-SAGA ###
    ]);
  }
}
