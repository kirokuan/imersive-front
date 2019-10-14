import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () =>
    <div className="container">
        <span>Here is dashbaord</span>
        <br />
        <Link className="btn btn-primary" to="/">Logout</Link>

    </div>;


export default Dashboard;
