import React, {Component} from 'react';

export default class AddDonation extends Component {
  constructor(props) {
    super(props);
    console.log('HELLLLOO')
    this.state = {
      name: '',
      amount: ''
    }
  }
  handleNameChange = (event) => {
    this.setState({name: event.target.value});
  }
  handleAmountChange = (event) => {
    this.setState({amount: event.target.value});
  }
  onSubmit = (e) => {
    e.preventDefault();
    console.log('ON CLICK', e);
      console.log('this.state', this.state);
    const formData = {
      name: this.state.name,
      amount: this.state.amount
    }
    fetch('http://localhost:5000/donations', {
      method: 'POST',
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));
  }

  render() {
    return (
      <div>
        <h1>Add a Donation</h1>

        <form onSubmit={this.onSubmit}>
          Name: <input name="name" type="text" value={this.state.name} onChange={this.handleNameChange} />
          Amount: <input name="amount" type="number" value={this.state.amount} onChange={this.handleAmountChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


// <button onClick={this.onClick}>$1</button>
// <button onClick={this.onClick}>$2</button>
// <button onClick={this.onClick}>$3</button>
// <button onClick={this.onClick}>$5</button>
// <button onClick={this.onClick}>$10</button>
// <button onClick={this.onClick}>$20</button>
// <button onClick={this.onClick}>$50</button>
// <button onClick={this.onClick}>$100</button>