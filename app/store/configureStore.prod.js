import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export const history = createHistory();
const middleware = routerMiddleware(history);

const allMiddleware = applyMiddleware(apiMiddleware);
export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState, allMiddleware,
        applyMiddleware(middleware),
    );
}
