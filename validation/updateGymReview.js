const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function updateGymReview (data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (validator.isEmpty(data.text)) {
    errors.text = 'Review is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
