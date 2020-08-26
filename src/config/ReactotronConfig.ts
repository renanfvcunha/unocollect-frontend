import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

const tron = Reactotron.configure()
  .use(reactotronRedux())
  .use(sagaPlugin({ except: [''] }));

if (process.env.NODE_ENV === 'development') {
  tron.connect();
}

if (tron.clear) {
  tron.clear();
}

export default tron;
