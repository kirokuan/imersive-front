import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const WideButton = styled.button`
 margin: 10px;
 font-size: 20px;
`;

// login() {
//     this.props.history.push({ pathname: `login` });
// }
// register() {
//     this.props.history.push({ pathname: `register` });
//  }
// <WideButton className="btn btn-primary" >Login </WideButton>
//        <WideButton className="btn btn-primary">Register</WideButton>
const App = () =>
    <div className="container">
        <Link to="/public/register" className="btn btn-primary">Register</Link>
        <Link to="/public/login" className="btn btn-primary">Login</Link>

    </div>;


export default App;
