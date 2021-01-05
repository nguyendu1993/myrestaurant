import {Provider} from 'react-redux';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import thunk from 'redux-thunk';
import firebase from './src/firebase/firebase';
import {createFirestoreInstance} from 'redux-firestore';

import {createStore, applyMiddleware} from 'redux';
import myReducer from './src/redux/reducers/index';
const store = createStore(myReducer, applyMiddleware(thunk));

console.disableYellowBox = true;

const ReduxTutorial = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
AppRegistry.registerComponent(appName, () => ReduxTutorial);
