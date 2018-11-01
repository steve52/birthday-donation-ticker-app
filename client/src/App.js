import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import Ticker from './Components/Ticker';
import AddDonation from './Components/AddDonation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Ticker}></Route>
        <Route exact path="/add" component={AddDonation}></Route>
      </div>
    );
  }
}

export default App;
