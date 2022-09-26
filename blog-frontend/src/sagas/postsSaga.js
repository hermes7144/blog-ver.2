import { all, call, fork, put, take } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import { postsActions } from '../slices/postsSlice';

// api 서버 연결 후 action 호출

function* asyncGetPostsList(action) {
  try {
    const response = yield call(postsAPI.listPosts, action.payload);

    if (response.status === 200) {
      yield put(postsActions.getPostsListSuccess(response));
    } else {
      yield put(postsActions.getPostsListFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(postsActions.getPostsListFail(e.response));
  }
}

function* asyncGetBoardPostsList(action) {
  try {
    const response = yield call(postsAPI.listBoardPosts, action.payload);

    if (response.status === 200) {
      yield put(postsActions.getBoardPostsListSuccess(response));
    } else {
      yield put(postsActions.getBoardPostsListFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(postsActions.getBoardPostsListFail(e.response));
  }
}

// action 호출을 감시하는 watch 함수
function* watchGetPostsList() {
  while (true) {
    const action = yield take(postsActions.getPostsList);
    yield call(asyncGetPostsList, action);
  }
}

// action 호출을 감시하는 watch 함수
function* watchGetBoardPostsList() {
  while (true) {
    const action = yield take(postsActions.getBoardPostsList);
    yield call(asyncGetBoardPostsList, action);
  }
}
export default function* postsSaga() {
  yield all([fork(watchGetPostsList), fork(watchGetBoardPostsList)]);
}
