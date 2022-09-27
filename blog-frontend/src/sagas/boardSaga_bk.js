import { takeLatest } from 'redux-saga/effects';
import { boardActions } from '../slices/boardSlice';
import client from '../lib/api/client';
import createRequestSaga from '../lib/createRequestSaga';

// api 서버 연결 주소
function apiGetBoardList() {
  return client.get(`/api/board`);
}

function apiPostBoard(requestBody) {
  return client.post(`/api/board`, requestBody);
}

function apiPutBoard({ _id, value, description }) {
  return client.put(`/api/board/${_id}`, { value, description });
}
function apiDeleteBoard(_id) {
  return client.delete(`/api/board/${_id}`);
}

const getBoardListSaga = createRequestSaga(boardActions.getBoardList, apiGetBoardList);
const postBoardListSaga = createRequestSaga(boardActions.postBoard, apiPostBoard);
const putBoardListSaga = createRequestSaga(boardActions.putBoard, apiPutBoard);
const deleteBoardListSaga = createRequestSaga(boardActions.deleteBoard, apiDeleteBoard);

export default function* postSaga() {
  yield takeLatest(boardActions.getBoardList, getBoardListSaga);
  yield takeLatest(boardActions.postBoard, postBoardListSaga);
  yield takeLatest(boardActions.putBoard, putBoardListSaga);
  yield takeLatest(boardActions.deleteBoard, deleteBoardListSaga);
}
