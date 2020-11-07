import React from 'react';
import logo from './logo.svg';
import './App.css';
import http from '../../Services/Axios/api'

function App() {
  console.log(http)
  return (
    <div className="App">
      <h1>Hello World!!!</h1>
    </div>
  );
}

export default App;
