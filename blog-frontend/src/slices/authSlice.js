import { createSlice } from '@reduxjs/toolkit';

const name = 'auth';

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};
const reducers = {
  changeField: (state, { payload: { form, key, value } }) => {
    state[form][key] = value;
  },
  initializeForm: (state, { payload: form }) => ({
    ...state,
    [form]: initialState[form],
    authError: null,
  }),
  register: () => {},

  registerSuccess: (state, { payload: auth }) => {
    state.authError = null;
    state.auth = auth;
  },
  registerFail: (state, { payload: error }) => {
    state.authError = error;
  },
  login: () => {},

  loginSuccess: (state, { payload: auth }) => {
    state.authError = null;
    state.auth = auth;
  },
  loginFail: (state, { payload: error }) => {
    state.authError = error;
  },
};

const authSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const auth = authSlice.reducer;
export const authActions = authSlice.actions;
