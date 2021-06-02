import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {api, AuthResponse} from "./api";
import {saveToken} from './token'

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  loadingStatus: 'initial' | 'loading' | 'loaded' | 'error';
  currentRequestId: unknown;
  error: string;
}

export const loginThunk = createAsyncThunk<AuthResponse, {login, password}>(
  'auth/login',
  async ({login, password}, thunkAPI) => {
    return api.login(login, password)
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    return api.logout()
  }
);

export const initialAuthState: AuthState = {
  isAuthenticated: !!window.localStorage.getItem('id_token'),
  loadingStatus: 'initial',
  currentRequestId: undefined,
  error: null,
}

export const authSlice = createSlice({
  name: AUTH_FEATURE_KEY,
  initialState: initialAuthState,
  reducers: {
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state: AuthState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        loginThunk.fulfilled,
        (state: AuthState, action: PayloadAction<AuthResponse>) => {
          if(action.payload.access_token) {
            saveToken(action.payload.access_token)
            state.isAuthenticated = true;
            state.loadingStatus = 'loaded';
          } else if(action.payload.statusCode === 401) {
            state.isAuthenticated = false;
            state.loadingStatus = 'error';
            state.error = 'Wrong credentials'
          }
        }
      )
      .addCase(loginThunk.rejected, (state: AuthState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      })
      .addCase(logoutThunk.pending, (state: AuthState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        logoutThunk.fulfilled,
        (state: AuthState) => {
          saveToken('')
          state.isAuthenticated = false;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(logoutThunk.rejected, (state: AuthState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const authReducer = authSlice.reducer;

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
 *   dispatch(authActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const authActions = authSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllAuth);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */

export const getAuthState = (rootState: unknown): AuthState =>
  rootState[AUTH_FEATURE_KEY];

