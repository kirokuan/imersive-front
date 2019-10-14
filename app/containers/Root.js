import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from '../components/App';
import RegisterForm from '../components/RegisterForm';
import { PrivateRoute } from '../components/PrivateRoute';
import DevTools from './DevTools';
import Dashbaord from '../components/Dashbaord';

export default function Root({ store, history }) {
    return (
        <Provider store={store}>
            <div>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/public/login" render={(props) => <RegisterForm {...props} login={true} />} />
                        <Route path="/public/register" component={RegisterForm} />
                        <PrivateRoute path="/dashboard" component={Dashbaord} />
                        <Route exact path="/" component={App} />
                    </Switch>
                </ConnectedRouter>
                {process.env.NODE_ENV !== 'production' && <DevTools />}
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};
