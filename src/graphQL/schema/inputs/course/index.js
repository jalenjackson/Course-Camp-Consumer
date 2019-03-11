const { Course } = require('./course');
const { User } = require('./user');
const { Section } = require('./section');
const { Video } = require('./video');
const { MatchingGameAnswer } = require('./matchingGame/matchingGameAnswer');
const { MatchingGameQuestion } = require('./matchingGame/matchingGameQuestion');
const { CodingChallenge } = require('./codingChallenge');

exports.allCourseInputs = `
  ${Course}
  ${User}
  ${Section}
  ${Video}
  ${MatchingGameQuestion}
  ${MatchingGameAnswer}
  ${CodingChallenge}
`;
