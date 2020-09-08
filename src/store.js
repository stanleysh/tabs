import { createStore, combineReducers, applyMiddleware } from 'redux';
import userReducer from './Redux/user'
import logger from 'redux-logger';

const reducers = combineReducers({
    userReducer
});

const store = createStore(reducers, applyMiddleware(logger));

export default store;