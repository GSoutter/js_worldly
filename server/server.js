const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const fetch = require('node-fetch');
require('dotenv').config();

const cors = require('cors')
const parser = require('body-parser')


app.use(parser.json());
app.use(cors())

// Handle Production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
  console.log("production is loaded")

}

const dbConnectionString = process.env.DB_CONNECTION_STRING;  
//old offline location used mongoDB'mongodb://localhost:27017'

// For flag and capital quiz database access
MongoClient.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then((client) => {
  const db = client.db('worldly_GP_wk10');
  const countriesCollection = db.collection('countriesPlus');
  const countriesRouter = createRouter(countriesCollection);
  app.use('/api/countriesPlus', countriesRouter);

})
.catch(console.error);


// For map quiz database access
MongoClient.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
.then((client) => {
  const db = client.db('worldly_GP_wk10');
  const countriesCollection = db.collection('amMapPerformance');
  const countriesRouter = createRouter(countriesCollection);
  app.use('/api/amMapPerformance', countriesRouter);

})
.catch(console.error);

app.get('/', (req, res) => {
  res.send('Hello World')
})

// server side api request
app.get('/restCountries', (req, res) => {
  const url = 'https://restcountries.eu/rest/v2/all';
  fetch(url)
  .then(jsonData => jsonData.json())
  .then(data => res.json(data));
});

const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
