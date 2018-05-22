let db_config = module.exports = {};

db_config.dbUrl = 'mongodb://sampleuser:sampleuser123@ds151528.mlab.com:51528/sampledemo';
db_config.collections = {
  userCollectionName: 'users',
  categoriesCollectionName: 'categories'
}
db_config.state = {
  db:null
}

