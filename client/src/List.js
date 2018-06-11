import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';


class App extends Component {

  constructor() {
    super();
    // const  socket = io('http://localhost:3001');
    this.state = {
      endpoint: "http://localhost:3001" // this is where we are connecting to with sockets
    }
  }

  render() {
    const socket = io(this.state.endpoint);

    socket.on('connection', function(){
      console.log('a user connected');
    });
    socket.on('disconnect', function(){
      console.log('disconnected');
    });
    return (
      <div className="App">
      </div>
    );
  }
}

export default App;
