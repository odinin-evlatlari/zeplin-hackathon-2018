import { fork, take, put } from 'redux-saga/effects';
import Common from '../constants/Common.constants';
import { appInitFinish } from "../actions/appActions";

function* initSaga() {
  yield take(Common.INIT_START);
  yield put(appInitFinish());
}

export default function* sagaWatcher() {
  yield fork(initSaga);
}
