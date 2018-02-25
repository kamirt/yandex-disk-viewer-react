import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';

import Folders from './components/Folders';
import Header from './components/Header';
import folderReducers from './reducers/folders';
import loginReducers from './reducers/login';
import { getFolders } from './actions/FolderActions';
import { login } from './actions/LoginActions';

const client = axios.create({
  baseURL:'http://localhost:5005/yadisk-api/',
  responseType: 'json'
});

const reducer = combineReducers({folders: folderReducers, login: loginReducers});
const store = createStore(
  reducer,
  applyMiddleware(
    axiosMiddleware(client), // onSuccess, onError, onComplete, successSuffix, errorSuffix
  )
);

class App extends Component {

  render () {
    return (
      <Provider store={store}>
          <div className="container">
              <Header />
              <Switch>
                <Route exact path='/' component={Folders} />
                <Route path='/:uid' component={Folders} />
              </Switch>
          </div>
      </Provider>
    );
  }
}

export default App;
