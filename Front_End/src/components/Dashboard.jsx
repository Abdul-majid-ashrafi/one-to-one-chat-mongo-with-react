import React, { Component } from 'react'
import axios from 'axios';

export class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      message: [],
      recepient: null
    }
  }
  chaat(v) {
    this.setState({ recepient: v._id })
    const getToken = localStorage.getItem('token')
    const loggedInUser = JSON.parse(localStorage.getItem('user'))
    axios.get('http://localhost:4000/chat',
      {
        headers: {
          token: getToken,
          sender: loggedInUser._id,
          recepient: v._id,
        }
      })
      .then((response) => {
        this.setState({ message: response.data.message })
      })
      .catch((error) => {
        console.log('error', error);
      });
    this.setState({
      open: true
    })
  }

  submit(e) {
    e.preventDefault();
    var vm = this
    const getToken = localStorage.getItem('token');
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    var data = {
      sender: loggedInUser._id,
      recepient: vm.state.recepient,
      message: vm.refs.sms.value
    }
    axios.defaults.headers.common['token'] = getToken;
    axios.post('http://localhost:4000/chat', data)
      .then((response) => {
        console.log("RESss ", response)
      })
      .catch((error) => {
        console.log('error', error);
      });
  }


  render() {
    console.log(this.state.recepient)
    return (
      <div className="container">
        <div className="top">
          <h2>Friend's List</h2>
        </div>
        <div className="row">
          <div className="shadow">

            {this.props.friendList.map((val, ind) => {
              return (
                <div className="col-sm-12" key={ind} onClick={this.chaat.bind(this, val)}>
                  <div className="col-sm-2">
                    <img src="https://www.infrascan.net/demo/assets/img/avatar5.png" className="img-circle" width="60px" />
                  </div>
                  <div className="col-sm-8">
                    <h4><a>{val.fullName}</a></h4>
                    <p><a>{val.email}</a></p>
                    <br />
                    <hr />
                  </div>
                </div>
              )
            })}
            <div className="clearfix"></div>
          </div>
        </div>



        {(this.state.open) ?
          <div>
            <ol className="chat">
              {this.state.message.map((val, ind) => {
                return (
                  <li className="other" key={ind}>
                    <div className="avatar"><img src="https://i.imgur.com/DY6gND0.png" draggable="true" /></div>
                    <div className="msg">
                      <p>{val.message}</p>
                      <time>{val.dateCreated}</time>
                    </div>
                  </li>
                )
              })}
              {/*<li className="self">
                <div className="avatar"><img src="https://i.imgur.com/HYcn9xO.png" draggable="true" /></div>
                <div className="msg">
                  <p>name...</p>
                  <p>Aún estoy haciendo el contexto de Góngora... <emoji className="books" /></p>
                  <p>Mejor otro día</p>
                </div>
              </li>*/}
            </ol>
            <form className="form-signin" onSubmit={this.submit.bind(this)} >
              <input className="textarea" type="text" placeholder="Type here!" ref="sms" /><div className="emojis"></div>
            </form>
          </div>
          : ""}
      </div>
    );
  }
}