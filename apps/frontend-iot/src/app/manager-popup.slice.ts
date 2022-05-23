import {
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {PeripheralGroup} from '@home/data-access';

export const MANAGER_POPUP_FEATURE_KEY = 'managerPopup';

interface ManagerPopupStateItem {
  Type: string
  ID: number
}

export interface ManagerPopupState {
  isOpened: boolean
  data?: PeripheralGroup
  item?: ManagerPopupStateItem
  header?: string
}

export const initialManagerPopupState: ManagerPopupState = {
  isOpened: false,
  data: null,
  item: null,
  header: null,
};

export const managerPopupSlice = createSlice({
  name: MANAGER_POPUP_FEATURE_KEY,
  initialState: initialManagerPopupState,
  reducers: {
    openDataPopup(state, {payload: {data, header}}) {
      state.isOpened = true;
      state.data = data;
      state.item = null;
      state.header = header;
    },
    closePopup(state) {
      state.isOpened = false;
      state.data = null;
      state.item = null;
      state.header = null;
    },
    openItemPopup(state, {payload: {ID, Type, header}}) {
      state.isOpened = true;
      state.data = null;
      state.item = {ID, Type};
      state.header = header;
    },
  },
});

export const managerPopupReducer = managerPopupSlice.reducer;

export const managerPopupActions = managerPopupSlice.actions;

export const getManagerPopupState = (rootState: unknown): ManagerPopupState =>
  rootState[MANAGER_POPUP_FEATURE_KEY];

export const selectManagerPopupHeader = createSelector(getManagerPopupState, (state) => state.header);
export const selectManagerPopupData = createSelector(getManagerPopupState, (state) => state.data);
export const selectManagerPopupItem = createSelector(getManagerPopupState, (state) => state.item);
export const selectManagerPopupIsOpened = createSelector(getManagerPopupState, (state) => state.isOpened);

