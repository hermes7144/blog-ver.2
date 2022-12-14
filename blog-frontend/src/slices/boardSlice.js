import { createSlice } from '@reduxjs/toolkit';

const name = 'board';

const initialState = {
  boardList: [],
  boardStatus: 0,
  boardStatusText: 'Loading',
};

const reducers = {
  getBoardList: (state, action) => {},
  getBoardListSuccess: (state, action) => {
    state.boardList = action.payload?.data ?? [];
    state.boardStatus = action.payload?.status;
    state.boardStatusText = action.payload?.statusText ?? 'Success';
  },
  getBoardListFailure: (state, action) => {
    state.boardList = [];
    state.boardStatus = action.payload?.status ?? 500;
    state.boardStatusText = action.payload?.statusText ?? 'Network Error';
  },

  postBoard: (state, action) => {}, //추가 - 게시판 신규 등록
  postBoardSuccess: (state, action) => {}, //추가
  postBoardFailure: (state, action) => {}, //추가

  putBoard: (state, action) => {}, //추가 - 게시판 개별 수정
  putBoardSuccess: (state, action) => {}, //추가
  putBoardFailure: (state, action) => {}, //추가

  deleteBoard: (state, action) => {}, //추가 - 게시판 개별 삭제
  deleteBoardSuccess: (state, action) => {}, //추가
  deleteBoardFailure: (state, action) => {}, //추가
};

const boardSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const board = boardSlice.reducer;
export const boardActions = boardSlice.actions;
