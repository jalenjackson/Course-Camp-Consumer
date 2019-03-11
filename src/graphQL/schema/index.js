const { buildSchema } = require('graphql');
const { Types } = require('./types');
const { Inputs } = require('./inputs');
const { Queries } = require('./queries/root');
const { Mutations } = require('./mutations/root');
const { SchemaDefinition } = require('./schemaDefinition');

module.exports = buildSchema(`
  ${Types}
  ${Inputs}
  ${Queries}
  ${Mutations}
  ${SchemaDefinition}
`);
