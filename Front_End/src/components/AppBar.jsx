import React, { Component } from 'react'

import { Link } from "react-router"
class NavBar extends Component {

    componentWillMount() {

    }

    logout() {
    }
    render() {
        return (
            <div>
                {/*{(this.props.route.path === '/login' || this.props.route.path === 'registration') ?
                    this.props.children
                    :*/}
                    <div>
                        <nav className="navbar navbar-inverse navbar-fixed-top">
                            <div className="container-fluid">
                                <a className="navbar-brand">Chat app</a>
                                <div id="navbar" className="navbar-collapse collapse">
                                    <ul className="nav navbar-nav navbar-right">

                                        <li>
                                            <Link to="/Friend">
                                                Friend list
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to="/registration">
                                                Signup
                                    </Link>
                                        </li>
                                        <li>
                                            <Link to="/login">
                                                login
                                    </Link>
                                        </li>
                                        <li>
                                            <a onClick={this.logout.bind(this)}>Logout</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                        {this.props.children}
                    </div>
            </div>
        )
    }
};

export default NavBar;