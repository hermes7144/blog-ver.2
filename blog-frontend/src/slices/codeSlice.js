import { createSlice } from '@reduxjs/toolkit';

const name = 'code';

const initialState = {
  codeList: [],
  status: 0,
  statusText: 'Loading',
};

const reducers = {
  getCodeList: (state, action) => {},
  getCodeListSuccess: (state, action) => {
    state.commentList = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? 'Success';
  },
  getCodeListFail: (state, action) => {
    state.commentList = initialState.commentList;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? 'Network Error';
  },

  postCode: (state, action) => {}, //추가 - 게시판 신규 등록
  postCodeSuccess: (state, action) => {}, //추가
  postCodeFail: (state, action) => {}, //추가

  putCode: (state, action) => {}, //추가 - 게시판 개별 수정
  putCodeSuccess: (state, action) => {}, //추가
  putCodeFail: (state, action) => {}, //추가

  deleteCode: (state, action) => {}, //추가 - 게시판 개별 삭제
  deleteCodeSuccess: (state, action) => {}, //추가
  deleteCodeFail: (state, action) => {}, //추가
};

const codeSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const code = codeSlice.reducer;
export const codeActions = codeSlice.actions;
