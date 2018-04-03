import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WeatherComp from './WeatherComp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Weather Application</h1>
        </header>
        <p className="App-intro">
          Select a city to check the weather conditions, and forecaset
        </p>
        <WeatherComp />
      </div>
    );
  }
}

export default App;
