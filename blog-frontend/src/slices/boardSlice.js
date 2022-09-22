import { createSlice } from '@reduxjs/toolkit';

const name = 'board';

const initialState = {
  boardList: [],
  status: 0,
  statusText: 'Loading',
};

const reducers = {
  getBoardList: (state, action) => {},
  getBoardListSuccess: (state, action) => {
    state.commentList = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? 'Success';
  },
  getBoardListFail: (state, action) => {
    state.commentList = initialState.commentList;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? 'Network Error';
  },

  postBoard: (state, action) => {}, //추가 - 게시판 신규 등록
  postBoardSuccess: (state, action) => {}, //추가
  postBoardFail: (state, action) => {}, //추가

  putBoard: (state, action) => {}, //추가 - 게시판 개별 수정
  putBoardSuccess: (state, action) => {}, //추가
  putBoardFail: (state, action) => {}, //추가

  deleteBoard: (state, action) => {}, //추가 - 게시판 개별 삭제
  deleteBoardSuccess: (state, action) => {}, //추가
  deleteBoardFail: (state, action) => {}, //추가
};

const boardSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const board = boardSlice.reducer;
export const boardActions = boardSlice.actions;
