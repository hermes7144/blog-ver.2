import { createSlice } from '@reduxjs/toolkit';

const name = 'posts';

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const reducers = {
  getPostsList: (state, action) => {},
  getPostsListSuccess: (state, action) => {
    state.posts = action.payload?.data ?? [];
    state.lastPage = parseInt(action.payload?.headers['last-page'], 10);
  },
  getPostsListFail: (state, action) => {
    state.posts = initialState.commentList;
    state.error = action.payload?.status ?? 500;
  },

  getBoardPostsList: (state, action) => {},
  getBoardPostsListSuccess: (state, action) => {
    state.posts = action.payload?.data ?? [];
    state.lastPage = parseInt(action.payload?.headers['last-page'], 10);
  },
  getBoardPostsListFail: (state, action) => {
    state.posts = initialState.commentList;
    state.error = action.payload?.status ?? 500;
  },
};

const postsSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const posts = postsSlice.reducer;
export const postsActions = postsSlice.actions;
