import { createSlice } from '@reduxjs/toolkit';

const name = 'post';

const initialState = {
  post: null,
  error: null,
};

const reducers = {
  readPost: (state, action) => {},
  readPostSuccess: (state, { payload: post }) => {
    state.post = post;
  },
  readPostFailure: (state, { payload: postError }) => {
    state.post = null;
    state.error = postError;
  },
  unloadPost: () => initialState,
};

const postSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const post = postSlice.reducer;
export const postActions = postSlice.actions;
