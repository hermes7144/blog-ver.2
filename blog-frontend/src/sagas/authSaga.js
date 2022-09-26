import { all, call, fork, put, take } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import { authActions } from '../slices/authSlice';

function* asyncRegister(action) {
  try {
    const response = yield call(authAPI.register, action.payload);

    if (response.status === 200) {
      yield put(authActions.registerSuccess(response));
    } else {
      yield put(authActions.registerFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(authActions.registerFail(e.response));
  }
}

function* asyncLogin(action) {
  try {
    const response = yield call(authAPI.login, action.payload);

    if (response.status === 200) {
      yield put(authActions.loginSuccess(response));
    } else {
      yield put(authActions.loginFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(authActions.loginFail(e.response));
  }
}

// action 호출을 감시하는 watch 함수
function* watchRegister() {
  while (true) {
    const action = yield take(authActions.register);
    yield call(asyncRegister, action);
  }
}
// action 호출을 감시하는 watch 함수
function* watchLogin() {
  while (true) {
    const action = yield take(authActions.login);
    yield call(asyncLogin, action);
  }
}
export default function* postsSaga() {
  yield all([fork(watchRegister), fork(watchLogin)]);
}
