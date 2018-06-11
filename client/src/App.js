import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';


class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateChat = this.updateChat.bind(this);

    // const  socket = io('http://localhost:3001');
    this.state = {
      endpoint: "http://localhost:3001", // this is where we are connecting to with sockets
      messages: {},
      message: '',
      count: 0
    }

    this.socket = io(this.state.endpoint);

    this.socket.on('connection', function(){
      console.log('a user connected');
    });

    this.socket.on('disconnect', function(){
      console.log('disconnected');
    });

    this.socket.on('chat message', this.updateChat);
  }

  updateChat(message) {
    var timestamp = (new Date()).getTime();
    console.log('State: ' + this.state);
    this.state.messages['msg-'+timestamp] = message;
    this.setState({messages: this.state.messages});
  }

  // Anytime something changes, update our message content
  handleChange(event) {
    this.setState({message: event.target.value});
  }

  // Anytime we submit a form, emit the message to everyone else
  handleSubmit(event) {
    this.setState({message: ''});
    this.socket.emit('chat message', this.state.message);
    event.target.value = '';
    event.preventDefault();
  }

  render() {

    return (
      <div className="App">
        <ul>
          {
            Object.keys(this.state.messages).map(function(key) {
              return <li key={key}>{this.state.messages[key]}</li>
            }.bind(this))
          }
        </ul>

        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.message} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
