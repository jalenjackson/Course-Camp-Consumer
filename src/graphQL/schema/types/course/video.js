exports.Video = `
  type Video {
    title: String!
    description: String!
    videoLocation: String!
    quiz: [Quiz]
    pictureQuiz: [PictureQuiz]
    matchingGame: MatchingGame
    crunchChallenge: CrunchChallenge
    codingChallenge: CodingChallenge
    codingProject: CodingProject
  }
`;
