import React from 'react';
import { connect } from 'react-redux';
import { registerApi } from '../actions/api';
import styled from 'styled-components';
const mapStateToProps = state => {
    return { ...state.login };
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: (username, pwd) => {
            dispatch(registerApi(username, pwd));
        }
    };
};
const Main = styled.div`
padding-top: 100px
`;

class RegisterForm extends React.Component {
    componentWillMount() {
        this.setState({ login: {} });
    }
    changeInput(typ) {
        return (e) => {
            this.setState({ [typ]: e.target.value });
        };
    }
    validate = (e) => {
        this.state.error = [];
        if (this.state.password !== this.state.password_r) {
            this.state.error.push("passwords are not matched.");
        }
        if (this.state.username.length < 5) {
            this.state.error.push("username length should be greater than 5");
        }
        if (this.state.password.length < 5) {
            this.state.error.push("password length should be greater than 5");
        }
        if (!this.state.error) {
            this.props.onRegister(this.state.username, this.state.password);
        }
        return false;
    }
    render() {
        //      let username,password;
        return (
            <Main className="container">
                <h5>Register</h5>

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
                            <div className="form-group">
                                <label>Repeat Password</label>
                                <input type="password" className="form-control" placeholder="Repeat Password" onChange={this.changeInput("password_r").bind(this)} />
                            </div>
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
