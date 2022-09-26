import { takeLatest } from 'redux-saga/effects';
import * as postsAPI from '../lib/api/posts';
import { postActions } from '../slices/postSlice';
import createRequestSaga from '../lib/createRequestSaga';

// saga 생성
const readPosttSaga = createRequestSaga(postActions.readPost, postsAPI.readPost);

export default function* postSaga() {
  yield takeLatest(postActions.readPost, readPosttSaga);
}
