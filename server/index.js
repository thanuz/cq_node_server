let express = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');
let db_helper = require('./db_helper');
let cq_utils = require('./cq_utlis');
const MongoClient = require('mongodb').MongoClient;
let db_config = require('./db_config');
let cq_token_utlis = require('./cq_token_utlis');



let app = express();

let jsonParser = bodyParser.json()



app.get('/', (req, res) => {
  return res.send('Welcome to careerquo API');
});

app.get('/users', (req, res) => {
  let users = [];
  let userCollection = cq_utils.getUserCollection(db_config.state.db);
  db_helper.getAllUsers(userCollection, (err, records) => {
    if (!err)
      return res.json(records);
    else {
      return res.sendStatus(500)
    }
  });
});

app.get('/categories', (req, res) => {
  let categories = [];
  let categoreisCollection = cq_utils.getCategoriesCollection(db_config.state.db);
  db_helper.getAllCategories(categoreisCollection, (err, records) => {
    if (!err)
      return res.json(records);
    else {
      return res.sendStatus(500)
    }
  })
});

app.get('/users/:userId', cq_token_utlis.verifyUser, (req, res) => {
  let params = req.params;
  let userCollection = cq_utils.getUserCollection(db_config.state.db);
  db_helper.getUserDetails(params.userId, userCollection, (err, record) => {
    if (!err)
      return res.json(record);
    else {
      return res.sendStatus(401);
    }
  })
});

app.post('/user', jsonParser, (req, res) => {
  if (_.isEmpty(req.body)) {
    return res.sendStatus(400);
  } else {
    let userCollection = cq_utils.getUserCollection(db_config.state.db);
    db_helper.saveUserData(req.body, userCollection, (err, record) => {
      if (!err) {
        let token = cq_utils.generateToken(record)
        return res.json({
          token
        });
      } else {
        return res.sendStatus(400);
      }
    })

  }
})


MongoClient.connect(db_config.dbUrl, (err, database) => {
  if (err) {
    console.log(err);
  } else {
    db_config.state.db = database.db('sampledemo');
    console.log("========== Connected successfully to the MongoDb server ==========");
  }
});

app.listen(8001, () => {
  console.log('server has started @port 8001');
});
