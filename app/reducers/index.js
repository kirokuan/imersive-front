import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { LoginActions, RegisterActions } from '../actions/api';
import Auth from '../utils/Auth';

const login = (state = { username: null }, action) => {
    switch (action.type) {
        case LoginActions.req():
            return { ...state, isLoading: true };
        case RegisterActions.success():
        case LoginActions.success():
            Auth.set("username");
            return { ...state, redirect: true, username: Auth.getUser() };
        case LoginActions.fail():
            return { ...state, isLoading: false, error: { msg: "Login Failed." } };
        case RegisterActions.fail():
            return { ...state, isLoading: false, error: { msg: "Register Failed." } };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    login
});

export default rootReducer;
