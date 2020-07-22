import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Menu from './components/Menu';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Menu />
    </Provider>
  );
};

export default App;
