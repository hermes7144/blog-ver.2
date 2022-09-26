import { createSlice } from '@reduxjs/toolkit';

const name = 'posts';

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const reducers = {
  getPostsList: (state, action) => {},
  getPostsListSuccess: (state, { payload: posts, meta: response }) => {
    state.posts = posts;
    state.lastPage = parseInt(response.headers['last-page'], 10); // 문자열을 숫자로 변환
  },
  getPostsListFailure: (state, { payload: error }) => {
    state.posts = null;
    state.error = error;
  },

  getBoardPostsList: (state, action) => {},
  getBoardPostsListSuccess: (state, { payload: posts, meta: response }) => {
    state.posts = posts;
    state.lastPage = parseInt(response.headers['last-page'], 10); // 문자열을 숫자로 변환
  },
  getBoardPostsListFailure: (state, { payload: error }) => {
    state.posts = null;
    state.error = error;
  },
};

const postsSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const posts = postsSlice.reducer;
export const postsActions = postsSlice.actions;
