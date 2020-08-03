import React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from './store';
import Menu from './components/Menu';
import Login from './pages/Login';

interface Logged {
  logged: boolean;
}

const Auth: React.FC<Logged> = ({ logged }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [logged, setLogged] = useState(false);

  if (!logged) {
    return <Login />;
  }

  return (
    <Menu />
  );
};

export default connect((state: ApplicationState) => ({
  logged: state.auth.logged
}))(Auth);
