import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
padding: 100px;
`;
const WideButton = styled.span`
 margin: 10px;
 font-size: 20px;
`;

const App = () =>
    <Main className="container">
        <WideButton>
            <Link to="/public/register" className="btn btn-primary">Register</Link>
        </WideButton>
        <WideButton>
            <Link to="/public/login" className="btn btn-primary">Login</Link>
        </WideButton>
    </Main>;


export default App;
