import React, {Component} from 'react';

export default class SearchGymComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      keyword: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value
    });
    this.props.sendKeyword(event.target.value);
  }

  render() {
    return (
      <div className="input-group mb-3">
      <input value={this.state.keyword} onChange={this.handleChange} type="text" className="form-control" placeholder="Enter city..." aria-label="Recipient's username" aria-describedby="basic-addon2"/>
      </div>
    );
  }
}