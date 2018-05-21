let _ = require('lodash');
var bcrypt = require('bcrypt');

let db_config = require('./db_config');
let cq_utlis = module.exports = {};


cq_utlis.isUserIdValid = (userId) => {
  return /^[0-9A-F]{24}$/i.test(userId);
}

cq_utlis.isUserDataValid = (userData) => {

  if (cq_utlis.hasAllParams(userData)) {
    return true;
    //return /^[A-F]{1,10}$/i.test(userData.firstName);
  }
  return false;
}

cq_utlis.getUserCollection = (db) => {
  return db.collection(_.get(db_config, 'collections.userCollectionName', ''));
}

cq_utlis.getCategoriesCollection = (db) => {
  return db.collection(_.get(db_config, 'collections.categoriesCollectionName', ''));
}

cq_utlis.generatePasswordHash = (password) => {
  return bcrypt.hashSync(password, 10);
}

cq_utlis.hasAllParams = (userData) => {
  return (_.get(userData, 'firstName') && _.get(userData, 'lastName') && _.get(userData, 'password'));
}
