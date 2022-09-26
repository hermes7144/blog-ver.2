import { createSlice } from '@reduxjs/toolkit';
const name = 'user';

const initialState = {
  user: null,
  checkError: null,
};

const reducers = {
  tempSetUser: (state, { payload: user }) => {
    state.user = user;
  },
  check: () => {},
  checkSuccess: (state, { payload: user }) => {
    state.user = user;
    state.checkError = null;
  },
  checkFailure: (state, { payload: error }) => {
    state.user = null;
    state.checkError = error;
  },

  logout: (state, action) => {
    state.user = null;
  },
};

const userSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const user = userSlice.reducer;
export const userActions = userSlice.actions;
