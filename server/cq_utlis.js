let _ = require('lodash');

let db_config = require('./db_config');
let cq_utlis = module.exports = {};


cq_utlis.isUserIdValid = (userId) => {
  return /^[0-9A-F]{24}$/i.test(userId);
}

cq_utlis.getUserCollection = (db) => {
  return db.collection(_.get(db_config, 'collections.userCollectionName', ''));
}

cq_utlis.getCategoriesCollection = (db) => {
  return db.collection(_.get(db_config, 'collections.categoriesCollectionName', ''));
}
