import { takeLatest } from 'redux-saga/effects';
import { commentActions } from '../slices/commentSlice';
import * as commentAPI from '../lib/api/comment';
import createRequestSaga from '../lib/createRequestSaga';
const getCommentsSaga = createRequestSaga(commentActions.getComments, commentAPI.getComments);
const insertCommentSaga = createRequestSaga(commentActions.insertComment, commentAPI.insertComment);
const deleteCommentSaga = createRequestSaga(commentActions.deleteComment, commentAPI.deleteComment);

export default function* commentSaga() {
  yield takeLatest(commentActions.getComments, getCommentsSaga);
  yield takeLatest(commentActions.insertComment, insertCommentSaga);
  yield takeLatest(commentActions.deleteComment, deleteCommentSaga);
}
