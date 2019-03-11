exports.courseQueries = `
  courses(limit: Float, skip: Float): [Course!]!
  singleCourse(courseId: String!): Course!
  courseByStatus(status: String!): [Course!]!
`;
