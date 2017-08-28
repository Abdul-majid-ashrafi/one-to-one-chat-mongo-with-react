import React from "react"
import './stye.css'
export const SignInFrom = (props) => {
    return (
        <div className="container">
            <br />
            <br />
            <br />
            <form className="form-signin" onSubmit={props._submit} >
                <h2 className="form-signin-heading">Please sign in</h2>
                <input type="email"
                    className="form-control"
                    placeholder="Email address"
                    name="email"
                    value={props.state.email}
                    onChange={props._inputHandler}
                    required autoFocus />
                <input type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    value={props.state.password}
                    onChange={props._inputHandler}
                    required />

                {(props.isLoading) ?
                    <div>
                        <br />
                        <div className="loader"></div>
                    </div>
                    :
                    <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                }
            </form>
        </div>
    )
}