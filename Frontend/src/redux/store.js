import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import projectsSlice from './projectsSlice';
import templateSlice from './templateSlice';
import {
  persistStore,
  persistReducer, // imported persistReducer
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage
};

const rootReducer = combineReducers({
  auth: authSlice,
  projects: projectsSlice,
  templates: templateSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    })
});

export default store;
