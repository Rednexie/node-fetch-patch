// Import the rethinkdb module
let r = require('rethinkdb');
module.exports =  () => {
  return new Promise((resolve, reject) => {
    r.connect({
      host: 'localhost',
      port: 28015,
      db: 'rednexie',
      user: 'admin',
      password: ''
    })
      .then(conn => {
        r.db('rethinkdb').table('users').insert({id: 'alice', password: 'secret'}).run(conn)
        return resolve(conn)
      })
      .catch(err => {
        return reject(err);
        throw new Error(err)
        
      })
      .finally(() => {
        
      })
  })
}