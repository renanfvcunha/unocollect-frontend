import { createStore, Store, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { AuthState } from './modules/auth/types';
import { PageTitleState } from './modules/pageTitle/types';
import { UsersState } from './modules/users/types';
import tron from '../config/ReactotronConfig';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  pageTitle: PageTitleState;
  users: UsersState;
}

const persistConfig = {
  key: 'datacollector',
  storage,
  whitelist: ['auth'],
};

const sagaMonitor = tron.createSagaMonitor!();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store: Store<ApplicationState> = createStore(
  persistedReducer,
  compose(applyMiddleware(sagaMiddleware), tron.createEnhancer!()),
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
