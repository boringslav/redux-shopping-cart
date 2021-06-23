import '@babel/polyfill'

import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'

import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from "redux-devtools-extension";
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
