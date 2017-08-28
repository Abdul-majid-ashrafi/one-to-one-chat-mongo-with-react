import React, { Component } from 'react'
import { Dashboard } from '../components'
import axios from 'axios';
// import { browserHistory } from 'react-router'


export class Home extends Component {
    constructor() {
        super()
        this.state = {
            friendList: []
        }
    }

    componentWillMount() {
        let vm = this
        const getToken = localStorage.getItem('token')
        const loggedInUser = JSON.parse(localStorage.getItem('user'))
        // console.log(loggedInUser)
        axios.get('http://localhost:4000/friend/list',
            {
                headers: {
                    token: getToken,
                    email: loggedInUser.email
                },
            })
            .then((response) => {
                vm.setState({ friendList: response.data.user })
            })
            .catch((error) => {
                console.log('error', error);
            });
    }

    render() {
        return (
            <div>
                <Dashboard friendList={this.state.friendList}></Dashboard>
            </div>
        );
    }
}