const isEmpty = require('../helpers/is-empty');
const { isEmpty: checkIfEmpty, isEmail } = require('validator');

module.exports.validateCreateUserData = (data) => {
  let errors = {};
  data.givenName = !isEmpty(data.givenName) ? data.givenName : '';
  data.familyName = !isEmpty(data.familyName) ? data.familyName : '';
  data.email = !isEmpty(data.email) ? data.email : '';

  if (checkIfEmpty(data.givenName)) {
    errors.givenName = 'Family name must not be empty';
  }
  if (checkIfEmpty(data.familyName)) {
    errors.familyName = 'Family name must not be empty';
  }
  if (checkIfEmpty(data.email)) {
    errors.email = 'Email must not be empty';
  } else if (!isEmail(data.email)) {
    errors.email = 'Email must be a valid email address';
  }

  return {
    errors,
    // this can be just: valid: isEmpty(errors)
    // But I think using the ternary operator makes it more readable that we're return a boolean value
    valid: isEmpty(errors) ? true : false
  };
};

module.exports.validateUpdateUserData = (data) => {
  let errors = {};

  if (data.givenName && checkIfEmpty(data.givenName)) {
    errors.givenName = 'Family name must not be empty';
  }
  if (data.familyName && checkIfEmpty(data.familyName)) {
    errors.familyName = 'Family name must not be empty';
  }
  if (data.email && checkIfEmpty(data.email)) {
    errors.email = 'Email must not be empty';
  } else if (data.email && !isEmail(data.email)) {
    errors.email = 'Email must be a valid email address';
  }

  return {
    errors,
    valid: isEmpty(errors) ? true : false
  };
};
