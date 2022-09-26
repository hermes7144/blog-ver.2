import { createSlice } from '@reduxjs/toolkit';

const name = 'write';

const initialState = {
  title: '',
  body: '',
  board: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const reducers = {
  initialize: () => initialState,
  changeField: (state, { payload: { key, value } }) => ({
    ...state,
    [key]: value,
  }),
  writePost: () => ({
    post: null,
    postError: null,
  }),
  writePostSuccess: (state, { payload: post }) => {
    state.post = post;
  },
  writePostFailure: (state, { payload: postError }) => {
    state.postError = postError;
  },
  setOriginalPost: (state, { payload: post }) => ({
    title: post.title,
    body: post.body,
    board: post.board,
    tags: post.tags,
    originalPostId: post._id,
  }),
  updatePost: () => {},

  updatePostSuccess: (state, { payload: post }) => {
    state.post = post;
  },
  updatePostFailure: (state, { payload: postError }) => {
    state.postError = postError;
  },
};

const writeSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const write = writeSlice.reducer;
export const writeActions = writeSlice.actions;
