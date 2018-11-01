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
    ws.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      if (data.message_type === 'new_donation') {
        this.setState({
          total: data.total,
          last_donation: {
            name: data.donation.name,
            amount: data.donation.amount,
          }
        })
      }
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
