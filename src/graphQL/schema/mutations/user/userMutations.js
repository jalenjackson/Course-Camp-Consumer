exports.userMutations = `
  createUser(userInput: UserInput): User
  handleBoughtCourse(courseId: String!, amountPaid: Float!): User
  handlePayout(receiver: String!, amount: Float!): User
  uploadProfileImage(image: String!): User
  changeUserInfo(name: String, email: String): User
  forgotPassword(email: String): User
  changePassword(password: String, userId: String): User
`;
