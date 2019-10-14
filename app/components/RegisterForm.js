import React from 'react';
import { connect } from 'react-redux';
import { registerApi, loginApi } from '../actions/api';
import styled from 'styled-components';
const UsernameLengthLimit = 5;
const PasswordLengthLimit = 5;
const mapStateToProps = state => {
    return { ...state.login };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (username, pwd) => {
            dispatch(registerApi(username, pwd));
        },
        onLogin: (username, pwd) => {
            dispatch(loginApi(username, pwd));
        }
    };
};
const Main = styled.div`
padding-top: 100px
`;

class RegisterForm extends React.Component {
    componentWillMount() {
        this.setState({ login: {}, password: "", password_r: "", username: "" });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirect) {
            this.props.history.push({
                pathname: `/dashboard`
            });
        }
    }
    changeInput(typ) {
        return (e) => {
            this.setState({ [typ]: e.target.value });
        };
    }
    checkCondition(condition, alertStr) {
        if (condition()) {
            this.state.error.push(alertStr);
        }
    }

    validate = (e) => {
        this.setState({ error: [] }, () => {
            this.checkCondition(() => !this.props.login && this.state.password !== this.state.password_r, "passwords are not matched.");
            this.checkCondition(() => this.state.username.length < UsernameLengthLimit, "username length should be greater than 5");
            this.checkCondition(() => this.state.password.length < PasswordLengthLimit, "password length should be greater than 5");

            if (this.state.error.length === 0) {
                if (this.login) {
                    this.props.onLogin(this.state.username, this.state.password);
                } else {
                    this.props.onRegister(this.state.username, this.state.password);
                }
            } else {
                this.setState({ error: [...this.state.error] });
            }
        });
        return false;
    }
    render() {
        return (
            <Main className="container">
                {!this.props.login && <h5>Register</h5>}
                {this.props.login && <h5>Login</h5>}

                {this.props.isLoading && <div className="alert alert-info"> <i className="fa fa-circle-o-notch fa-spin"></i> <strong>Loading...</strong></div>}
                {this.state.error && <div className="alert alert-info"><ul>{this.state.error.map(e => <li>{e}</li>)}</ul></div>}
                {!this.props.isLoading &&
                    <div>
                        <form>
                            {this.props.error && <div className="alert alert-danger">Register Failed</div>}
                            <br />
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" placeholder="User Name" onChange={this.changeInput("username").bind(this)} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" onChange={this.changeInput("password").bind(this)} />
                            </div>
                            {!this.props.login && <div className="form-group">
                                <label>Repeat Password</label>
                                <input type="password" className="form-control" placeholder="Repeat Password" onChange={this.changeInput("password_r").bind(this)} />
                            </div>}
                        </form>
                        <button className="btn btn-primary" onClick={this.validate}>Submit</button>
                    </div>
                }

            </Main>);
    }
}

const ConnectedForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);

export default ConnectedForm;
