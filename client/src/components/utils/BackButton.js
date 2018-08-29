import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class BackButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <button
        className="btn btn-secondary"
        onClick={this.context.router.history.goBack}>
          Back
      </button>
    )
  }
}