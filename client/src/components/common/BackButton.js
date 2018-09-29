import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default class BackButton extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  render() {
    return (
      <button
        className="btn btn-light mb-2"
        onClick={this.context.router.history.goBack}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
    );
  }
}