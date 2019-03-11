const { courseMutations } = require('./courseMutations');
const { pictureQuizMutations } = require('./pictureQuizMutations');
const { answerChoiceQuizMutations } = require('./answerChoiceQuizMutations');
const { sectionMutations } = require('./sectionMutations');
const { videoMutations } = require('./videoMutations');
const { matchingGameMutations } = require('./matchingGameMutations');
const { crunchChallengeMutations } = require('./crunchChallengeMutations');
const { codingChallengeMutations } = require('./codingChallengeMutations');
const { codingProjectMutations } = require('./codingProjectMutations');
const { globalMutations } = require('./globalMutations');

exports.allCourseMutations = `
  ${ courseMutations }
  ${ pictureQuizMutations }
  ${ answerChoiceQuizMutations }
  ${ sectionMutations }
  ${ videoMutations }
  ${ matchingGameMutations }
  ${ crunchChallengeMutations }
  ${ codingChallengeMutations }
  ${ codingProjectMutations }
  ${ globalMutations }
`;
