import { all, call, fork, put, take } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import { userActions } from '../slices/userSlice';

// api 서버 연결 후 action 호출

function* asyncCheck(action) {
  try {
    const response = yield call(authAPI.check, action.payload);

    if (response.status === 200) {
      yield put(userActions.checkSuccess(response));
    } else {
      yield put(userActions.checktFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(userActions.checkFail(e.response));
  }
}

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
// action 호출을 감시하는 watch 함수
function* watchCheck() {
  while (true) {
    const action = yield take(userActions.check);
    yield call(asyncCheck, action);
  }
}

// action 호출을 감시하는 watch 함수
function* watchCheckFailure() {
  while (true) {
    const action = yield take(userActions.checkFail);
    yield call(checkFailureSaga, action);
  }
}

// action 호출을 감시하는 watch 함수
function* watchLogout() {
  while (true) {
    const action = yield take(userActions.logout);
    yield call(logoutSaga, action);
  }
}

export default function* userSaga() {
  yield all([fork(watchCheck), fork(watchCheckFailure), fork(watchLogout)]);
}
