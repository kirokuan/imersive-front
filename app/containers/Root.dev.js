import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from '../components/App';
import RegisterForm from '../components/RegisterForm';
import DevTools from './DevTools';

export default function Root({ store, history }) {
    return (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/public/login" component={App} />
                        <Route path="/public/register" component={RegisterForm} />
                        <Route exact path="/" component={App} />
                    </Switch>
                </ConnectedRouter>
                <DevTools />
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
