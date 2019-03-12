require('dotenv').config();
const express = require('express');
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

const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use((req, res, next) => {
  let allowedOrigins = ['http://localhost:5000'];
  let origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

server.use(VerifyAuthentication);
server.use('/uploaders', Uploaders);
server.use('/api-routes', APIRoutes);
server.use('/graphql', graphQlHTTP({
  schema,
  rootValue,
  graphiql: true
}));

const mongoEnv = dev ? 'development' : 'production';

return mongoose.connect(`mongodb+srv://${ process.env.MONGO_USER }:${ process.env.MONGO_PASSWORD }@coursecamp-qxarr.mongodb.net/${ mongoEnv }?retryWrites=true`,
  { useNewUrlParser: true })
  .then(() => {
    server.listen(PORT, () => console.log(`Course Camp API Running`));
  })
  .catch(err => console.log(err));

