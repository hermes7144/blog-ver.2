import { createSlice } from '@reduxjs/toolkit';

const name = 'post';

const initialState = {
  post: null,
  error: null,
};

const reducers = {
  getReadPost: (state, action) => {},
  getReadPostSuccess: (state, action) => {
    state.post = action.payload?.data ?? [];
  },
  getReadPostFail: (state, action) => {
    state.post = initialState.commentList;
    state.error = action.payload?.status ?? 500;
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
