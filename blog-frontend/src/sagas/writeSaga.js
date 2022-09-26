import { takeLatest } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import { writeActions } from '../slices/writeSlice';
import createRequestSaga from '../lib/createRequestSaga';

// saga 생성
const getPostsListSaga = createRequestSaga(writeActions.writePost, postsAPI.writePost);
const getBoardPostsList = createRequestSaga(writeActions.updatePost, postsAPI.updatePost);

export default function* writeSaga() {
  yield takeLatest(writeActions.writePost, getPostsListSaga);
  yield takeLatest(writeActions.updatePost, getBoardPostsList);
}
