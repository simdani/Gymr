const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateCreateGym(data) {
  let errors = [];

  data.name = !isEmpty(data.name) ? data.name : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  
  if (validator.isEmpty(data.name)) {
    errors.name = 'Name is required!';
  }

  if (validator.isEmpty(data.city)) {
    errors.city = 'City is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
