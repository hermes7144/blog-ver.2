import { all, call, fork, put, select, take } from 'redux-saga/effects';
import { commentActions } from '../slices/commentSlice';
import * as commentAPI from '../lib/api/comment';

// api 서버 연결 후 action 호출
function* asyncGetCommentList(action) {
  try {
    const response = yield call(commentAPI.listComments, action.payload);

    if (response.status === 200) {
      yield put(commentActions.getCommentListSuccess(response));
    } else {
      yield put(commentActions.getCommentListFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(commentActions.getCommentListFailure(e.response));
  }
}

function* asyncInsertComment(action) {
  try {
    const post = yield select((state) => state.post);
    const response = yield call(commentAPI.writeComment, {
      content: action.payload,
      postId: post.post._id,
    });
    if (response.status === 200) {
      yield put(commentActions.insertCommentSuccess());
      yield put(commentActions.getCommentList(post.post._id));
    } else {
      yield put(commentActions.insertCommentFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(commentActions.insertCommentFailure(e.response));
    yield alert(`등록 실패 Error: ${e?.response?.status}, ${e?.response?.statusText}`);
  }
}

function* asyncDeleteComment(action) {
  try {
    const post = yield select((state) => state.post);
    yield call(commentAPI.deleteComment, action.payload);

    yield put(commentActions.getCommentList(post.post._id));
  } catch (e) {}
}

// action 호출을 감시하는 watch 함수
function* watchGetCommentList() {
  while (true) {
    const action = yield take(commentActions.getCommentList);
    yield call(asyncGetCommentList, action);
  }
}

function* watchInsertComment() {
  while (true) {
    const action = yield take(commentActions.insertComment);

    yield call(asyncInsertComment, action);
  }
}

function* watchDeleteComment() {
  while (true) {
    const action = yield take(commentActions.deleteComment);
    yield call(asyncDeleteComment, action);
  }
}

export default function* commentSaga() {
  yield all([fork(watchGetCommentList), fork(watchInsertComment), fork(watchDeleteComment)]);
}
