import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Auth from './Auth';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
};

export default App;
