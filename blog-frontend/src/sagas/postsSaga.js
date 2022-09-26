import { takeLatest } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import { postsActions } from '../slices/postsSlice';
import createRequestSaga from '../lib/createRequestSaga';

// saga 생성
const getPostsListSaga = createRequestSaga(postsActions.getPostsList, postsAPI.listPosts);
const getBoardPostsList = createRequestSaga(postsActions.getBoardPostsList, postsAPI.listBoardPosts);

export default function* postSaga() {
  yield takeLatest(postsActions.getPostsList, getPostsListSaga);
  yield takeLatest(postsActions.getBoardPostsList, getBoardPostsList);
}
