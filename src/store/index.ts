import  sliceMovie  from './sliceMovie';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {   MovieApi,auth,fetchCommentApi,info,infoTag,torrentApi } from './MovieApi'; 


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const rootReducer = combineReducers({
    [MovieApi.reducerPath]: MovieApi.reducer,
    [fetchCommentApi.reducerPath]: fetchCommentApi.reducer,
    [auth.reducerPath]: auth.reducer,
    [torrentApi.reducerPath]: torrentApi.reducer,
    [info.reducerPath]: info.reducer,
    [infoTag.reducerPath]: infoTag.reducer,
    sliceMovie,
});


const persistConfig = {
  key: 'root',
  storage,
  blacklist:['toggleDropdown',infoTag.reducerPath,info.reducerPath,MovieApi.reducerPath,torrentApi.reducerPath,fetchCommentApi.reducerPath,auth.reducerPath]
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(infoTag.middleware,info.middleware,torrentApi.middleware,auth.middleware,MovieApi.middleware,fetchCommentApi.middleware);
    },
});

setupListeners(store.dispatch)

export const persiter = persistStore(store);
export type TypeRootState = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
