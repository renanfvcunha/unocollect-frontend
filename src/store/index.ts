import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import { AuthState } from './modules/auth/types';
import { PageTitleState } from './modules/pageTitle/types';
import { UsersState } from './modules/users/types';
import { FormsState } from './modules/forms/types';
import { FillsState } from './modules/fills/types';
import { CategoriesState } from './modules/categories/types';
import { ImagesState } from './modules/images/types';
import { GroupsState } from './modules/groups/types';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  pageTitle: PageTitleState;
  users: UsersState;
  forms: FormsState;
  fills: FillsState;
  categories: CategoriesState;
  images: ImagesState;
  groups: GroupsState;
}

/**
 * Criando configuração do Redux Persist.
 */
const persistConfig = {
  key: 'unocollect',
  storage,
  whitelist: ['auth'],
};

/**
 * Criando configuração do Saga Middleware.
 */
const sagaMiddleware = createSagaMiddleware();

/**
 * Mesclando configurações do Redux Persist com o Root Reducer
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Criando o store principal do Redux
 */
const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

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
