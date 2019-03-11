exports.videoMutations = `
  addVideoToSection(courseId: String!, sectionIndex: Float!, videoInput: VideoInput): Course    
  updateVideoDetails(courseId: String!, sectionIndex: Float!, videoIndex: Float!, videoInput: VideoInput): Course    
  deleteVideo(courseId: String!, sectionIndex: Float!, videoIndex: Float!, fileId: String!): Course
`;
