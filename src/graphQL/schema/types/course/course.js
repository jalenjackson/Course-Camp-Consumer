exports.Course = `
  type Course {
    _id: ID!
    title: String!
    description: String!
    category: String!
    color: String!
    price: Float!
    date: String!
    status: String!
    creator: User!
    rating: Float!
    language: String!
    learning: String!
    summary: String!
    sections: [Section]
    publishedCourse: Course
    studentsEnrolled: Float
    reviews: [Review]
  }
`;
