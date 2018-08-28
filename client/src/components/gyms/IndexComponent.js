import React, {Component} from 'react';
import axios from 'axios';

export default class IndexComponent extends Component {
  state = {
    gyms: []
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/gyms')
      .then(res => {
        const gyms = res.data;
        this.setState({ gyms });
      })
  }

  render() {
    return (
      <div>
        <ul>
          { this.state.gyms.map(gym => <li>{gym.name}</li>)}
        </ul>
      </div>
    )
  }
}