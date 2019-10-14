import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/Auth';
const Dashboard = () =>
    <div className="container">
        <span>Here is dashbaord</span>
        <br />
        <Link className="btn btn-primary" to="/" onClick={Auth.clear}>Logout</Link>

    </div>;


export default Dashboard;
