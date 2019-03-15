exports.courseQueries = `
  courses(limit: Float, skip: Float): [Course!]!
  singleCourse(courseId: String!, ignorePublished: String): Course!
  courseByStatus(status: String!): [Course!]!
`;
