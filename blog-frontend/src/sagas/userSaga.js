import { call, takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import { userActions } from '../slices/userSlice';
import createRequestSaga from '../lib/createRequestSaga';

// api 서버 연결 후 action 호출

const checkSaga = createRequestSaga(userActions.check, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('user'); // localStorage 에서 user 제거하고
  } catch (e) {
    console.log('localStorage is not working');
  }
}
function* logoutSaga() {
  try {
    yield call(authAPI.logout); // logout API 호출
    localStorage.removeItem('user'); // localStorage 에서 user 제거
  } catch (e) {
    console.log(e);
  }
}

export default function* userSaga() {
  yield takeLatest(userActions.check, checkSaga);
  yield takeLatest(userActions.checkFailure, checkFailureSaga);
  yield takeLatest(userActions.logout, logoutSaga);
}
