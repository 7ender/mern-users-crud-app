function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
    return true;
  else return false;
}

// Can be written like this

// const isEmpty = value =>
//   value === undefined ||
//   value === null ||
//   (typeof value === 'object' && Object.keys(value).length === 0) ||
//   (typeof value === 'string' && value.trim().length === 0);

// But I think the one at the top is more readable even if it doesnt use arrow functions and is more code written

module.exports = isEmpty;
