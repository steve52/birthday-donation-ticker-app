import React, { Component } from 'react';

export default class Ticker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      last_donation: null,
    }
  }
  componentDidMount() {
    const ws = new WebSocket('ws://localhost:8080');
    // Event listener for recieving websocket messages from the server
    ws.addEventListener('message', (message) => {
      console.log('message', message);
      const data = JSON.parse(message.data);
      // if (data.message_type === 'new_donation') {
        this.setState({
          total: data.total,
          last_donation: data.donation
        })
      // }
    });
  }
  render() {
    return (
      <div className="App">
        <h2>Funds raised for The Joyful Heart Foundation</h2>
        <h1>${this.state.total}</h1>
        {this.state.last_donation &&
          <span>{this.state.last_donation.name}</span>}
      </div>
    );
  }
}
