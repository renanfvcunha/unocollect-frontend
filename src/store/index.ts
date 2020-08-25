import { createStore, Store, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { AuthState } from './modules/auth/types';
import { PageTitleState } from './modules/pageTitle/types';
import { UsersState } from './modules/users/types';
import { FormsState } from './modules/forms/types';
import { CategoriesState } from './modules/categories/types';
import { FillsState } from './modules/fills/types';
import tron from '../config/ReactotronConfig';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  pageTitle: PageTitleState;
  users: UsersState;
  forms: FormsState;
  fills: FillsState;
  categories: CategoriesState;
}

/**
 * Criando configuração do Redux Persist.
 */
const persistConfig = {
  key: 'datacollector',
  storage,
  whitelist: ['auth'],
};

/**
 * Criando configuração do Saga Middleware utilizando
 * Reactotron Saga Monitor para desenvolvimento.
 */
let sagaMiddleware: SagaMiddleware;
if (process.env.NODE_ENV === 'development' && tron.createSagaMonitor) {
  const sagaMonitor = tron.createSagaMonitor();
  sagaMiddleware = createSagaMiddleware({ sagaMonitor });
} else {
  sagaMiddleware = createSagaMiddleware();
}

/**
 * Mesclando configurações do Redux Persist com o Root Reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Criando o store principal do Redux utilizando
 * Reactotron para desenvolvimento
 */
let store: Store;
if (process.env.NODE_ENV === 'development' && tron.createEnhancer) {
  store = createStore(
    persistedReducer,
    compose(applyMiddleware(sagaMiddleware), tron.createEnhancer()),
  );
} else {
  store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
}

/**
 * Atribuindo variavel para o Persist Store do Redux Persist
 * passando o store principal como parâmetro
 */
const persistor = persistStore(store);

/**
 * Inicializando os Side Effects do Redux Saga
 */
sagaMiddleware.run(rootSaga);

export { store, persistor };
