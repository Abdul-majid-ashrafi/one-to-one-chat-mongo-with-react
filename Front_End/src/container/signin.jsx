import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { SignInFrom } from '../components'
import axios from 'axios';

export class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            loader: false
        }
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault();
        const vm = this
        vm.setState({ loader: true })
        let user = {
            email: vm.state.email,
            password: vm.state.password
        }
        axios.post('http://localhost:4000/auth/sign_in', user)
            .then(function (response) {
                localStorage.setItem('user', JSON.stringify(response.data.message))
                localStorage.setItem('token', response.data.token)
                vm.setState({ loader: false })
                browserHistory.push('/home')
            })
            .catch(function (error) {
                vm.setState({ loader: false })
                alert("Unauthorized User")
                console.log('error', error);
            });
    }

    render() {
        return (
            <div>
                <SignInFrom isLoading={this.state.loader} state={this.state} _inputHandler={this.inputHandler.bind(this)} _submit={this.submit.bind(this)} />
            </div>
        );
    }
}
