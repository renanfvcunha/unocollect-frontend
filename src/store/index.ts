import { createStore, Store, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { AuthState } from './modules/auth/types';
import { PageTitleState } from './modules/pageTitle/types';
import tron from '../config/ReactotronConfig';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

export interface ApplicationState {
  auth: AuthState;
  pageTitle: PageTitleState;
}

const sagaMonitor = tron.createSagaMonitor!();

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store: Store<ApplicationState> = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    tron.createEnhancer!(),
  ),
);

sagaMiddleware.run(rootSaga);

export default store;
