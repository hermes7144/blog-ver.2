import { all, call, fork, put, take } from 'redux-saga/effects';
import { boardActions } from '../slices/boardSlice';
import client from '../lib/api/client';

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

// api 서버 연결 후 action 호출

function* asyncGetBoardList() {
  try {
    const response = yield call(apiGetBoardList);

    if (response.status === 200) {
      yield put(boardActions.getBoardListSuccess(response));
    } else {
      yield put(boardActions.getBoardListFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(boardActions.getBoardListFailure(e.response));
  }
}

function* asyncPostBoard(action) {
  try {
    const response = yield call(apiPostBoard, {
      code: action.payload.board.code,
      name: action.payload.board.name,
    });

    if (response.status === 201) {
      yield put(boardActions.postBoardSuccess(response));
      alert('등록되었습니다.');
      yield call(action.payload?.setShowCreateBoard, false);
      yield put(boardActions.getBoardList());
    } else {
      yield put(boardActions.postBoardFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(boardActions.postBoardFailure(e.response));
    yield alert(`등록 실패 Error: ${e?.response?.status}, ${e?.response?.statusText}`);
  }
}

function* asyncPutBoard(action) {
  try {
    const response = yield call(apiPutBoard, action.payload);

    if (response.status === 200) {
      yield put(boardActions.putBoardSuccess(response));
      alert('저장되었습니다.');
      yield put(boardActions.getBoardList());
    } else {
      yield put(boardActions.putBoardFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(boardActions.putBoardFailure(e.response));
    yield alert(`등록 실패 Error: ${e?.response?.status}, ${e?.response?.statusText}`);
  }
}

function* asyncDeleteBoard(action) {
  try {
    const response = yield call(apiDeleteBoard, action.payload);

    if (response.status === 200) {
      yield put(boardActions.deleteBoardSuccess(response));
      alert('삭제되었습니다.');
      yield put(boardActions.getBoardList());
    } else {
      yield put(boardActions.deleteBoardFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(boardActions.deleteBoardFailure(e.response));
    yield alert(`등록 실패 Error: ${e?.response?.status}, ${e?.response?.statusText}`);
  }
}
// action 호출을 감시하는 watch 함수
function* watchGetBoardList() {
  while (true) {
    const action = yield take(boardActions.getBoardList);
    yield call(asyncGetBoardList, action);
  }
}

function* watchPostBoard() {
  while (true) {
    const action = yield take(boardActions.postBoard);

    yield call(asyncPostBoard, action);
  }
}

function* watchPutBoard() {
  while (true) {
    const action = yield take(boardActions.putBoard);
    yield call(asyncPutBoard, action);
  }
}

function* watchDeleteBoard() {
  while (true) {
    const action = yield take(boardActions.deleteBoard);
    yield call(asyncDeleteBoard, action);
  }
}

export default function* boardSaga() {
  yield all([fork(watchGetBoardList), fork(watchPostBoard), fork(watchPutBoard), fork(watchDeleteBoard)]);
}
