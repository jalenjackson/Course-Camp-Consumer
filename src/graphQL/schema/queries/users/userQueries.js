exports.userQueries = `
  login(email: String!, password: String!): AuthData!
  getUser: User!
  findUserByForgotPassword(token: String!): User
`;
