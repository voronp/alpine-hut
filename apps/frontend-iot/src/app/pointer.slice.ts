import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const POINTER_FEATURE_KEY = 'pointer';

export interface PointerState {
  selected: string;
  hovered: string;
  subSelected: string;
  subHovered: string;
}

export const initialPointerState: PointerState = {
  selected: '',
  hovered: '',
  subSelected: '',
  subHovered: '',
};

export const pointerSlice = createSlice({
  name: POINTER_FEATURE_KEY,
  initialState: initialPointerState,
  reducers: {
    setSelected(state, action) {
      if(!action.payload) {
        state.selected = '';
        state.subSelected = '';
        return;
      }
      state.selected = action.payload.key;
      state.subSelected = action.payload.key;
    },
    setHovered(state, action) {
      if(!action.payload) {
        state.hovered = '';
        state.subHovered = '';
        return;
      }
      state.hovered = action.payload.key;
      state.subHovered = action.payload.key;
    },
    setSubSelected(state, action) {
      if(!action.payload) {
        state.subSelected = '';
        return;
      }
      state.subSelected = action.payload.key;
    },
    setSubHovered(state, action) {
      if(!action.payload) {
        state.subHovered = '';
        return;
      }
      state.subHovered = action.payload.key;
    },
  },
});

/*
 * Export reducer for store configuration.
 */
export const pointerReducer = pointerSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(pointerActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const pointerActions = pointerSlice.actions;

export const getPointerState = (rootState: unknown): PointerState =>
  rootState[POINTER_FEATURE_KEY];

export const selectHovered = createSelector(getPointerState, (state) => state.hovered);

export const selectSelected = createSelector(getPointerState, (state) => state.selected);

export const selectSubHovered = createSelector(getPointerState, (state) => state.subHovered);

export const selectSubSelected = createSelector(getPointerState, (state) => state.subSelected);
