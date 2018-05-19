let express = require('express');
let bodyParser = require('body-parser');
let _ = require('lodash');
let db_helper = require('./db_helper');
let cq_utils = require('./cq_utlis');
const MongoClient = require('mongodb').MongoClient;
let db_config = require('./db_config');



let app = express();

let jsonParser = bodyParser.json()

let state = {
  db: null
};

app.get('/', (req, res) => {
  res.send('Welcome to careerquo API');
});

app.get('/users', (req, res) => {
  let users = [];
  let userCollection = cq_utils.getUserCollection(state.db);
  db_helper.getAllUsers(userCollection, (err, records) => {
    if (!err)
      res.json(records);
    else {
      res.sendStatus(500)
    }
  });
});

app.get('/categories', (req, res) => {
  let categories = [];
  let categoreisCollection = cq_utils.getCategoriesCollection(state.db);
  db_helper.getAllCategories(categoreisCollection, (err, records) => {
    if (!err)
      res.json(records);
    else {
      res.sendStatus(500)
    }
  })
});

app.get('/users/:userId', (req, res) => {
  let params = req.params;
  let userCollection = cq_utils.getUserCollection(state.db);
  db_helper.getUserDetails(params.userId, userCollection, (err, record) => {
    if (!err)
      res.json(record);
    else {
      res.sendStatus(401);
    }
  })
});

app.post('/user', jsonParser, (req, res) => {

  if (_.isEmpty(req.body)) {
    return res.sendStatus(400);
  } else {
    res.json(req.body);
  }
})


MongoClient.connect(db_config.dbUrl, (err, database) => {
  if (err) {
    console.log(err);
  } else {
    state.db = database.db('sampledemo');
    console.log("========== Connected successfully to the MongoDb server ==========");
  }
});

app.listen(8001, () => {
  console.log('server has started @port 3000');
});
