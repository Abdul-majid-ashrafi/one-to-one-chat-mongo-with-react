import React, { Component } from 'react'

export class SignUpFrom extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <br />
                    <br />
                    <br />
                    <br />
                    <form className="form-signin" onSubmit={this.props._submit} >
                        <h2 className="form-signin-heading">Register your account</h2>
                        <input type="text"
                            placeholder="user name"
                            className="form-control"
                            name="fullName"
                            value={this.props.signUpState.fullName}
                            onChange={this.props._inputHandler}
                            required autoFocus />

                        <input type="email"
                            placeholder="Email address"
                            className="form-control"
                            name="email"
                            value={this.props.signUpState.email}
                            onChange={this.props._inputHandler}
                            required />

                        <input type="password"
                            placeholder="password"
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            value={this.props.signUpState.password}
                            onChange={this.props._inputHandler}
                            required />

                        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        <button type="button" className="btn btn-link" onClick={this.props.login}> I have already Account Login</button>
                    </form>
                </div>
            </div>
        )
    }
}