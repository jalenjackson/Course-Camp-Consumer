exports.sectionMutations = `
  updateSectionDetails(courseId: String!, sectionIndex: Float!, sectionInput: SectionInput): Course
  deleteSection(courseId: String!, sectionIndex: Float!): Course
  addSectionToCourse(courseId: String!): Course
`;
