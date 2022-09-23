import { createSlice } from '@reduxjs/toolkit';

const name = 'code';

const initialState = {
  codeList: [],
  codeStatus: 0,
  codeStatusText: 'Loading',
};

const reducers = {
  getCodeList: (state, action) => {},
  getCodeListSuccess: (state, action) => {
    state.codeList = action.payload?.data ?? [];
    state.codeStatus = action.payload?.status;
    state.codeStatusText = action.payload?.statusText ?? 'Success';
  },
  getCodeListFail: (state, action) => {
    state.codeList = initialState.commentList;
    state.codeStatus = action.payload?.status ?? 500;
    state.codeStatusText = action.payload?.statusText ?? 'Network Error';
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
