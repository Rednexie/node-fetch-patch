



let permaDB;
let quickDB;
let mongoDB;
let rethinkDB;
let mySQL;



(async () => {
  mongoDB = await require('./db/mongodb')('mongodb://localhost:27017/rednexie')
  console.log('connected to MongoDB with id:', mongoDB.topology.s.id)
  permaDB = await require('./db/perma.db')()
  quickDB = await require('./db/quick.db')()
  rethinkDB = await require('./db/rethinkdb')()
  mySQL = await require('./db/mysql')('mysql://admin:admin@localhost:3306/rednexie')
  console.log('connected to MySQL with id: ', mySQL.threadId)
})()


console.title = 'RDH'


const fastify = require('fastify')({ 
    trustProxy: false,
    logger: false,
    bodyLimit: 10485760,
});

const cors = require('@fastify/cors');
const mongodb = require('./db/mongodb');
const mysql = require('./db/mysql');
fastify.register(cors, {
  origin: "*",
  credentials: "true",
})



fastify.listen({ host: '0.0.0.0', port: 3000}, (err, addr) => {
  if(err){
    throw new Error(err);
  }
  console.log('rednexie-data-hub is at port:', !isNaN(new URL(addr).port) ? Number(new URL(addr).port) : new URL(addr).port)
})