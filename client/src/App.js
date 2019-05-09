import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import './App.css';

import Form from './Components/Form';
import Users from './Components/Users';
import withAuth from './Components/withAuth';
const ProtectedUsers = withAuth(Users);

function App() {
    const logout = _ => {
        localStorage.clear();
    }
    return (
        <div className="App">
            <header className="App-header">
                <NavLink
                    to="/login"
                    activeStyle={{
                    borderBottom: 'dashed 3px #fff'
                }}>Login</NavLink>
                <NavLink
                    to="/register"
                    activeStyle={{
                    borderBottom: 'dashed 3px #fff'
                }}>Register</NavLink>
                <NavLink
                    to="/users"
                    activeStyle={{
                    borderBottom: 'dashed 3px #fff'
                }}>Users</NavLink>
                <button onClick={logout}>Logout</button>
            </header>
            <Route exact path="/" render={()=>(<div><h1>Welcome Home!</h1> <h3>There's nothing here...</h3></div>)} />
            <Route path="/login" component={Form}/>
            <Route path="/register" render={() => <Form register />}/>
            <Route path="/users" component={ProtectedUsers}/>
        </div>
    );
}

export default App;
