exports.Course = `
  input CourseInput {
    title: String
    description: String
    category: String
    color: String
    price: Float
    rating: Float
    language: String
    learning: [String]
    summary: String
  }
`;
