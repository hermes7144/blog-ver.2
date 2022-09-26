import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import { auth } from '../slices/authSlice';
import authSaga from '../sagas/authSaga';

import loading from './loading';
import user, { userSaga } from './user';
import { write } from '../slices/writeSlice';
import writeSaga from '../sagas/writeSaga';
import { post } from '../slices/postSlice';
import postSaga from '../sagas/postSaga';
import { comment } from '../slices/commentSlice';
import { board } from '../slices/boardSlice';
import { code } from '../slices/codeSlice';
import { posts } from '../slices/postsSlice';
import postsSaga from '../sagas/postsSaga';
import commentSaga from '../sagas/commentSaga';
import boardSaga from '../sagas/boardSaga';
import codeSaga from '../sagas/codeSaga';

const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  posts,
  comment,
  board,
  code,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga(), commentSaga(), boardSaga(), codeSaga()]);
}

export default rootReducer;
