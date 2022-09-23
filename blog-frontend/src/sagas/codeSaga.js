import { all, call, fork, put, select, take } from 'redux-saga/effects';
import { codeActions } from '../slices/codeSlice';
import client from '../lib/api/client';

// api 서버 연결 주소
function apiGetCodeList() {
  return client.get(`/api/code`);
}

function apiPostCode(requestBody) {
  return client.post(`/api/code`, requestBody);
}

function apiPutCode({ _id, value, description }) {
  return client.put(`/api/code/${_id}`, { value, description });
}

function apiDeleteCode(_id) {
  return client.delete(`/api/code/${_id}`);
}

// api 서버 연결 후 action 호출

function* asyncGetCodeList() {
  try {
    const response = yield call(apiGetCodeList);

    if (response.status === 200) {
      yield put(codeActions.getCodeListSuccess(response));
    } else {
      yield put(codeActions.getCodeListFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(codeActions.getCodeListFail(e.response));
  }
}

function* asyncPostCode(action) {
  try {
    const response = yield call(apiPostCode, {
      value: action.payload.code.value,
      description: action.payload.code.description,
    });

    if (response.status === 201) {
      yield put(codeActions.postCodeSuccess(response));
      alert('등록되었습니다.');
      yield call(action.payload?.setShowCreateCode, false);
      yield put(codeActions.getCodeList());
    } else {
      yield put(codeActions.postCodeFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(codeActions.postCodeFail(e.response));
    yield alert(`등록 실패 Error: ${e?.response?.status}, ${e?.response?.statusText}`);
  }
}

function* asyncPutCode(action) {
  try {
    const response = yield call(apiPutCode, action.payload);

    if (response.status === 200) {
      yield put(codeActions.putCodeSuccess(response));
      alert('저장되었습니다.');
      yield put(codeActions.getCodeList());
    } else {
      yield put(codeActions.putCodeFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(codeActions.putCodeFail(e.response));
    yield alert(`등록 실패 Error: ${e?.response?.status}, ${e?.response?.statusText}`);
  }
}

function* asyncDeleteCode(action) {
  try {
    const response = yield call(apiDeleteCode, action.payload);
    if (response.status === 200) {
      yield put(codeActions.deleteCodeSuccess(response));
      alert('삭제되었습니다..');
      yield put(codeActions.getCodeList());
    } else {
      yield put(codeActions.deleteCodeFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(codeActions.deleteCodeFail(e.response));
    yield alert(`등록 실패 Error: ${e?.response?.status}, ${e?.response?.statusText}`);
  }
}
// action 호출을 감시하는 watch 함수
function* watchGetCodeList() {
  while (true) {
    const action = yield take(codeActions.getCodeList);
    yield call(asyncGetCodeList, action);
  }
}

function* watchPostCode() {
  while (true) {
    const action = yield take(codeActions.postCode);

    yield call(asyncPostCode, action);
  }
}

function* watchPutCode() {
  while (true) {
    const action = yield take(codeActions.putCode);
    yield call(asyncPutCode, action);
  }
}

function* watchDeleteCode() {
  while (true) {
    const action = yield take(codeActions.deleteCode);
    yield call(asyncDeleteCode, action);
  }
}

export default function* codeSaga() {
  yield all([fork(watchGetCodeList), fork(watchPostCode), fork(watchPutCode), fork(watchDeleteCode)]);
}
