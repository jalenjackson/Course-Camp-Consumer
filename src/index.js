require('dotenv').config();
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const graphQlHTTP = require('express-graphql');
const mongoose = require('mongoose');
const schema = require('./graphQL/schema');
const rootValue = require('./graphQL/resolvers');
const VerifyAuthentication = require('./middleware/verifyAuthentication');
const Uploaders = require('./uploaders/uploaderRoutes');
const APIRoutes = require('./APIRoutes/index');

const dev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 8080;

const mongoEnv = dev ? 'development' : 'production';

mongoose.connect(`mongodb+srv://${ process.env.MONGO_USER }:${ process.env.MONGO_PASSWORD }@coursecamp-qxarr.mongodb.net/${ mongoEnv }?retryWrites=true`,
  { useNewUrlParser: true });

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  let allowedOrigins = ['http://localhost:5000', 'https://teamcoursecamp.com'];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, currentsection');
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, PATCH, GET');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});

app.use(VerifyAuthentication);
app.use('/uploaders', Uploaders);
app.use('/api-routes', APIRoutes);
app.use('/graphql', graphQlHTTP({
  schema,
  rootValue,
  graphiql: dev
}));

app.use(function(req, res) {
  res.status(200).json({
    error: 'The requested url was not found'
  })
});

app.listen(PORT, () => console.log('---------- Course Camp API Running --------'));
