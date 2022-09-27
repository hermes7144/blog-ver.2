import { createSlice } from '@reduxjs/toolkit';

const name = 'comment';

const initialState = {
  comments: [],
  commentError: null,
};

const reducers = {
  getComments: () => {},
  getCommentsSuccess: (state, { payload: comments }) => {
    state.comments = comments;
  },
  getCommentsFailure: (state, { payload: commentError }) => {
    state.commentError = commentError;
  },

  insertComment: () => {},
  insertCommentSuccess: (state, { payload: comment }) => {
    state.comments = state.comments.concat(comment);
  },
  insertCommentFailure: (state, { payload: commentError }) => {
    state.commentError = commentError;
  },
  deleteComment: () => {},
  deleteCommentSuccess: (state, { payload: id }) => {
    state.comments = state.comments.filter((comment) => comment._id !== id);
  },
  deleteCommentFailure: (state, { payload: commentError }) => {
    state.commentError = commentError;
  },
};

const commentSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const comment = commentSlice.reducer;
export const commentActions = commentSlice.actions;
