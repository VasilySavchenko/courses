import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { handleErrorMiddleware } from './middleware';
import authSlice from './auth/slice';
import coursesSlice from './courses/slice';

const appReducer = combineReducers({
    authSlice,
    coursesSlice,
});

export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(handleErrorMiddleware),
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;

/** Hook dispatch for redux toolkit */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/** Hook useSelector hook for redux toolkit */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
