import { all, call, fork, put, take } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import { writeActions } from '../slices/writeSlice';

function* asyncWritePost(action) {
  try {
    const response = yield call(postsAPI.writePost, action.payload);
    if (response.status === 200) {
      yield put(writeActions.writePostSuccess(response));
    } else {
      yield put(writeActions.writePostFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(writeActions.writePostFail(e.response));
  }
}

function* asyncUpdatePost(action) {
  try {
    const response = yield call(postsAPI.updatePost, action.payload);
    if (response.status === 200) {
      yield put(writeActions.updatePostSuccess(response));
    } else {
      yield put(writeActions.updatePostFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(writeActions.updatePostFail(e.response));
  }
}

// action 호출을 감시하는 watch 함수
function* watchWritePost() {
  while (true) {
    const action = yield take(writeActions.writePost);
    yield call(asyncWritePost, action);
  }
}

// action 호출을 감시하는 watch 함수
function* watchUpdatePost() {
  while (true) {
    const action = yield take(writeActions.updatePost);
    yield call(asyncUpdatePost, action);
  }
}
export default function* writeSaga() {
  yield all([fork(watchWritePost), fork(watchUpdatePost)]);
}
