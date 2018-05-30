let _ = require('lodash');
let jwt = require('jsonwebtoken');
let db_helper = require('./db_helper');
let cq_utlis = require('./cq_utlis');
let db_config = require('./db_config');

let cq_token_utlis = module.exports = {};

cq_token_utlis.verifyUser = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (_.isUndefined(bearerHeader)) {
    res.sendStatus(403);
  } else {
    const token = _.split(bearerHeader, ' ')[1];

    if (token) {
      cq_token_utlis.verifyToken(token, (err, isTokenValid) => {
        if (isTokenValid) {
          next();
        } else {
          return res.sendStatus(403);
        }
      });
    } else {
      return res.sendStatus(403);
    }
  }
}

cq_token_utlis.verifyToken = (token, callbck) => {
  try {
    const userData = jwt.verify(token, 'cq_jwt_secret_key');
    const {
      email
    } = userData.user;

    if (email) {
      const userCollection = cq_utlis.getUserCollection(db_config.state.db);
      db_helper.getUserDetailsByEmail(email, userCollection, (err, record) => {
        if (!err && record) {
          callbck(null, true)
        } else {
          callbck('err', false)
        }
      })

    } else {
      callbck('err', false)
    }
  } catch (err) {
    callbck('err', false)
  }

}
