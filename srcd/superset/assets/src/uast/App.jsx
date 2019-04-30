import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'bblfsh-web/src/state';
import BblfshApp from 'bblfsh-web/src/App';
import 'bblfsh-web/src/vendor.css';
import 'bblfsh-web/src/styling/index.less';
import './override.less';
import setupApp from '../setup/setupApp';

setupApp();

const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => (
  <Provider store={store}>
    <BblfshApp />
  </Provider>
);

export default hot(module)(App);
