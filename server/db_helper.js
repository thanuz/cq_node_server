let cq_utils = require('./cq_utlis');
let ObjectId = require('mongodb').ObjectID;

let db_helper = module.exports = {};

db_helper.getAllUsers = () => {
  return 'this is from getAllUsers';
}

db_helper.getAllUsers = (userCollection, callback) => {
  userCollection.find().toArray((err, records) => {
    if (!err) {
      callback(null, records);
    } else
      callback('error', {});
  });
}

db_helper.getAllCategories = (categoreisCollection, callback) => {
  categoreisCollection.find().toArray((err, records) => {
    if (!err) {
      callback(null, records);
    } else
      callback('error', {});
  });
}

db_helper.getUserDetails = (userId, userCollection, callback) => {
  if (cq_utils.isUserIdValid(userId)) {
    userCollection.findOne({
      _id: ObjectId(userId)
    }, (err, record) => {
      if (!err && record) {
        callback(null, record);
      } else {
        callback({
          error: 'user not found'
        }, {});
      }
    })
  } else {
    callback({error:'userId is not valid'}, {});
  }
}
