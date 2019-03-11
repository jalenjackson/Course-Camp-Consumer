const { Course } = require('./course');
const { User } = require('../user/user');
const { Section } = require('./section');
const { Video } = require('./video');
const { Quiz } = require('./quiz');
const { PictureQuiz } = require('./pictureQuiz');
const { MatchingGame } = require('./matchingGame/matchingGame');
const { MatchingGameAnswer } = require('./matchingGame/matchingGameAnswer');
const { MatchingGameQuestion } = require('./matchingGame/matchingGameQuestion');
const { CrunchChallenge } = require('./crunchChallenge');
const { CodingChallenge } = require('./codingChallenge');
const { CodingProject } = require('./codingProject');
const { Autocomplete } = require('../global/autocomplete');
const { Payout } = require('../global/payout');
const { Review } = require('../global/review');

exports.allCourseTypes = `
  ${Course}
  ${User}
  ${Section}
  ${Video}
  ${Quiz}
  ${PictureQuiz}
  ${MatchingGame}
  ${MatchingGameQuestion}
  ${MatchingGameAnswer}
  ${CrunchChallenge}
  ${CodingChallenge}
  ${CodingProject}
  ${Autocomplete}
  ${Payout}
  ${Review}
`;
