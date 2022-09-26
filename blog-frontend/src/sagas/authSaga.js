import { takeLatest } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import { authActions } from '../slices/authSlice';
import createRequestSaga from '../lib/createRequestSaga';

// saga 생성
const registerSaga = createRequestSaga(authActions.register, authAPI.register);
const loginSaga = createRequestSaga(authActions.login, authAPI.login);

export default function* authSaga() {
  yield takeLatest(authActions.register, registerSaga);
  yield takeLatest(authActions.login, loginSaga);
}
