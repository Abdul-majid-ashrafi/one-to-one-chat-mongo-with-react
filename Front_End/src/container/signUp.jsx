import React, { Component } from 'react'
import { browserHistory } from "react-router"
import { SignUpFrom } from '../components'
import axios from 'axios';
export class Signup extends Component {

    constructor() {
        super();
        this.state = {
            fullName: '',
            email: '',
            password: ''
        }
        this.submit = this.submit.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }
    componentWillMount() {
        browserHistory.push('/registration')
    }
    goToLogin() {
        browserHistory.push('/login')
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        axios.post('http://localhost:4000/auth/register', this.state)
            .then(function (response) {
                console.log('response', response);
                browserHistory.push('/login')
            })
            .catch(function (error) {
                console.log('error', error);
            });
    }

    render() {
        return (
            <div>
                <SignUpFrom login={this.goToLogin.bind(this)} signUpState={this.state} _inputHandler={this.inputHandler} _submit={this.submit} />
            </div>
        );
    }
}