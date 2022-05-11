import React from 'react';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {POINTER_FEATURE_KEY, pointerReducer} from "./app/pointer.slice";
import {AUTH_FEATURE_KEY, authReducer} from "./app/auth.slice";
import {MANAGER_POPUP_FEATURE_KEY, managerPopupReducer} from "./app/manager-popup.slice";
import {SCREEN_FEATURE_KEY, screenReducer} from './app/screen.slice'

export const Context = React.createContext(undefined);

export const store = configureStore({
  reducer: {
    [POINTER_FEATURE_KEY]: pointerReducer,
    [AUTH_FEATURE_KEY]: authReducer,
    [MANAGER_POPUP_FEATURE_KEY]: managerPopupReducer,
    [SCREEN_FEATURE_KEY]: screenReducer,
  },
  // Additional middleware can be passed to this array
  middleware: [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
  // Optional Redux store enhancers
  enhancers: [],
});

export default {
  Context,
  store,
}
