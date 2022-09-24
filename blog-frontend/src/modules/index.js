import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import write, { writeSaga } from './write';
import post, { postSaga } from './post';
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
