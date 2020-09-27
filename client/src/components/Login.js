import React, { Component } from 'react';
import { http } from '../interceptor';

class Login extends Component {

    render() {
        return (
            <div className="App">
                 <h1>Login Sample</h1>
                <a href={process.env.REACT_APP_GOOGLE_LOGIN_URL}>Login with Google</a>
            </div>
        );
    }
}

export default Login;