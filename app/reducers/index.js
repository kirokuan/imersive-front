import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { LoginActions, AuthClearActions } from '../actions/api';
import Auth from '../utils/Auth';

const login = (state = { username: null }, action) => {
    switch (action.type) {
        case LoginActions.req():
            return { ...state, isLoading: true };
        case AuthClearActions:
            return { ...state, isLoading: false, redirect: false };
        case LoginActions.success():
            const status = action.payload.status;
            if (status === 0) return { ...state, isLoading: false, error: { msg: "Login Fail" } };
            Auth.set("username");
            return { ...state, redirect: true, username: Auth.getUser() };
        case LoginActions.fail():
            return { ...state, isLoading: false, error: { msg: "combination wrong" } };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    login
});

export default rootReducer;
