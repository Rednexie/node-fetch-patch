const { MongoClient } = require('mongodb');

// Replace these values with your MongoDB connection details



module.exports = (url) => {
  return new Promise((resolve, reject) => {

    const uri = url;
    const client = new MongoClient(uri);
    client.connect()
    .then(conn => {
      return resolve(client);
    })
    .catch(err => {
      return reject(err);
      throw new Error(err)
    })
    .finally(() => {

    });
  })
}

