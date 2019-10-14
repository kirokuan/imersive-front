import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export const history = createHistory();
const middleware = routerMiddleware(history);
const allMiddleware = applyMiddleware(middleware, apiMiddleware);
export function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        compose(
            allMiddleware,
            DevTools.instrument()
        )
    );
}
