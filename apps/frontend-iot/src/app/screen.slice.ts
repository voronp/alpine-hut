import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import {number} from "prop-types";

export const SCREEN_FEATURE_KEY = 'screen';

export interface ScreenState {
  width: number;
  height: number,
}

export const initialScreenState: ScreenState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const screenSlice = createSlice({
  name: SCREEN_FEATURE_KEY,
  initialState: initialScreenState,
  reducers: {
    setWidth: (state: ScreenState, { payload }) => {
      state.width = payload
    },
    setHeight: (state: ScreenState, { payload }) => {
      state.height = payload
    },
  },
});

export const screenReducer = screenSlice.reducer;

export const screenActions = screenSlice.actions;

export const getScreenState = (rootState: unknown): ScreenState =>
  rootState[SCREEN_FEATURE_KEY];

export const selectWidth = createSelector(getScreenState, (state:ScreenState) => state.width);
export const selectHeight = createSelector(getScreenState, (state:ScreenState) => state.height);
