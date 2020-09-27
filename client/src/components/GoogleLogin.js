import React, { Component } from 'react';
import { http } from '../interceptor';

class GoogleLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: {}
        }
    }

    componentDidMount() {
        // get code
        const urlParams = new URLSearchParams(window.location.search);
        const googleCode = urlParams.get('code');
        http.get(`http://localhost:4000/getuserData?code=${googleCode}`).then(result => {
            console.log('res---', result)
            this.setState({
                userData: result.data.userData
            })
        }).catch(err => {
            console.log('err', err)
        })
    }

    render() {
        let {userData} = this.state;
        if(Object.keys(userData).length == 0) {
            return (
                <div>
                    <p>Fetching...</p>
                </div>
            );
        } 
        return (
            <div>
                <p>Eamil: {userData.email}</p>
                <p>Email Verified: {userData.email_verified.toString()}</p>
                <p>Profile Pic URL: {userData.picture}</p>
            </div>
        );
    }
}

export default GoogleLogin;