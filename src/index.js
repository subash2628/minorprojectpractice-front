import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const { io } = require("socket.io-client");
const permanentLink = "https://minorpractice.herokuapp.com/"
const temp = "http://localhost:5000"
const socket = io(permanentLink);

ReactDOM.render(
  <React.StrictMode>
    <App socket={socket}/>
  </React.StrictMode>,
  document.getElementById('root')
);


