import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Menu from './components/Menu';
import Login from './pages/Login';

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [logged, setLogged] = useState(true);

  if (!logged) {
    return <Login />;
  }

  return (
    <Provider store={store}>
      <Menu />
    </Provider>
  );
};

export default App;
