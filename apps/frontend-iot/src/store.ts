import React from 'react';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {POINTER_FEATURE_KEY, pointerReducer} from "./app/pointer.slice";
import {AUTH_FEATURE_KEY, authReducer} from "./app/auth.slice";

export const Context = React.createContext(undefined);

export const store = configureStore({
  reducer: {
    [POINTER_FEATURE_KEY]: pointerReducer,
    [AUTH_FEATURE_KEY]: authReducer,
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
