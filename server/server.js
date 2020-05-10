const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');
const fetch = require('node-fetch');

const cors = require('cors')
const parser = require('body-parser')


app.use(parser.json());
app.use(cors())



MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('worldly_GP_wk10');
  const countriesCollection = db.collection('countriesPlus');
  const countriesRouter = createRouter(countriesCollection);
  app.use('/api/countriesPlus', countriesRouter);

})
.catch(console.error);

MongoClient.connect('mongodb://localhost:27017')
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

app.get('/restCountries', (req, res) => {
  const url = 'https://restcountries.eu/rest/v2/all';
  fetch(url)
  .then(jsonData => jsonData.json())
  .then(data => res.json(data));
});


app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
