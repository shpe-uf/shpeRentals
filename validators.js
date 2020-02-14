module.exports.validateRentalRequest = (
  item,
  username,
  numberRequested,
  totalQuantity,
  currentRenters,
  itemTier,
  user
) => {

  let errors = {};

  //is in stock?
  if((totalQuantity - (currentRenters.length + numberRequested)) < 0) {
    errors.availability = 'The requested number is too high for the current stock';
  }

  //user exists?
  if(!user){
    errors.userExist = 'The user could not be found';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};

module.exports.validateReturnRequest = (
  item,
  username,
  numberReturning,
  totalQuantity,
  currentRenters,
  user,
  receipts
) => {

  let errors = {};

  //user exists?
  if(!user){
    errors.userExist = 'The user could not be found';
  }

  //number being returned is valid
  if(numberReturning > receipts.length | numberReturning > totalQuantity | numberReturning > currentRenters.filter((e) => e == username).length){
    errors.tooMuch = 'User is returning more items than exist or are checked out on record'
  }

  //username is in renters array
  if(currentRenters.filter((e) => {return e == username}).length < numberReturning) {
    errors.notCurrentRenter = 'Username not on record for that item';
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};