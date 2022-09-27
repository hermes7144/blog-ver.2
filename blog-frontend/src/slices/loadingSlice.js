import { createSlice } from '@reduxjs/toolkit';
const name = 'loading';

const initialState = {};

const reducers = {
  startLoading: (state, action) => ({
    ...state,
    [action.payload]: true,
  }),
  finishLoading: (state, action) => ({
    ...state,
    [action.payload]: false,
  }),
};

const loadingSlice = createSlice({
  name,
  initialState,
  reducers,
});
export const loading = loadingSlice.reducer;
export const loadingActions = loadingSlice.actions;
