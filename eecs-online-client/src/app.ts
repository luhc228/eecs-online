import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Reducer } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const persistEnhancer = () => (createStore: any) => (reducer: Reducer, initialState: any, enhancer: any) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store, null);
  return { ...store, persist };
};

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
    extraEnhancers: [persistEnhancer()],
    onReducer: (reducer: Reducer) => persistReducer(persistConfig, reducer),
  },

};
