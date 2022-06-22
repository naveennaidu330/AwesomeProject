import {createStore, compose , applyMiddleware} from 'redux';
import reducer from '../reducer';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore(
    {
        reducer: reducer,
        middleware: [thunk]
    }
)
export default store

// import {createStore, compose/* , applyMiddleware*/} from 'redux';
// import someReduxMiddleware from 'some-redux-middleware';
// import someOtherReduxMiddleware from 'some-other-redux-middleware';
// import rootReducer from './reducers/root.reducer';

// const enhancerList = [];
// const devToolsExtension = window && window.__REDUX_DEVTOOLS_EXTENSION__;

// if (typeof devToolsExtension === 'function') {
//   enhancerList.push(devToolsExtension());
// }

// const composedEnhancer = compose(/* applyMiddleware(someReduxMiddleware, someOtherReduxMiddleware),*/ ...enhancerList);

// const initStore = () => createStore(reducer, {}, composedEnhancer);

// module.exports = {
//   initStore
// };