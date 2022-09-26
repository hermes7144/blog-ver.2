import { all, call, fork, put, take } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import { postActions } from '../slices/postSlice';

function* asyncReadPost(action) {
  try {
    const response = yield call(postsAPI.readPost, action.payload);
    if (response.status === 200) {
      yield put(postActions.getReadPostSuccess(response));
    } else {
      yield put(postActions.getReadPostFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(postActions.getReadPostFail(e.response));
  }
}

function* watchGetPostList() {
  while (true) {
    const action = yield take(postActions.getReadPost);
    yield call(asyncReadPost, action);
  }
}

export default function* postSaga() {
  yield all([fork(watchGetPostList)]);
}
