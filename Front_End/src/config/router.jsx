import React, { Component } from 'react'
import { Route, Router, browserHistory, IndexRoute } from "react-router";
import {
    Signup,
    Signin,
    Home
} from '../container'
import { NavBar } from '../components'


export class AllRoutes extends Component {
    render() {
        return (
            <div>
                <Router history={browserHistory}>
                    <Route path="/registration" component={Signup} />
                    <Route path="/login" component={Signin} />
                    <Route path="/" component={NavBar}>
                        {/*<Route path="/registration" component={Signup} />*/}
                        <IndexRoute component={Signup} />
                        <Route path="/home" component={Home} />
                        {/*<Route path="/product_list" component={AllProductsContainer} />*/}
                    </Route>
                </Router>
            </div>
        )
    }
}