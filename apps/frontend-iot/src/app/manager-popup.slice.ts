import {
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

export const MANAGER_POPUP_FEATURE_KEY = 'managerPopup';

export interface ManagerPopupState {
  isOpened: boolean
  data: unknown
}

export const initialManagerPopupState: ManagerPopupState = {
  isOpened: false,
  data: null,
};

export const managerPopupSlice = createSlice({
  name: MANAGER_POPUP_FEATURE_KEY,
  initialState: initialManagerPopupState,
  reducers: {
    openPopup(state, {payload}) {
      state.isOpened = true;
      state.data = payload;
    },
    closePopup(state) {
      state.isOpened = false;
      state.data = null;
    },
  },
});

export const managerPopupReducer = managerPopupSlice.reducer;

export const managerPopupActions = managerPopupSlice.actions;

export const getManagerPopupState = (rootState: unknown): ManagerPopupState =>
  rootState[MANAGER_POPUP_FEATURE_KEY];

export const selectManagerPopupData = createSelector(getManagerPopupState, (state) => state.data);

export const selectManagerPopupIsOpened = createSelector(getManagerPopupState, (state) => state.isOpened);

