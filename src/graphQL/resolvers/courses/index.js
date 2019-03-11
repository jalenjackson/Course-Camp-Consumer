const { courses } = require('./courses');
const { singleCourse } = require('./singleCourse');
const { createCourse } = require('./createCourse');
const { addSectionToCourse } = require('./sections/addSectionToCourse');
const { addVideoToSection } = require('./sections/addVideoToSection');
const { deleteSection } = require('./sections/deleteSection');
const { deleteVideo } = require('./videos/deleteVideo');
const { addQuizQuestionToVideo } = require('./exercises/addQuiz/addQuizQuestionToVideo');
const { updateSectionDetails } = require('./sections/updateSectionDetails');
const { updateVideoDetails } = require('./videos/updateVideoDetails');
const { updateQuizQuestion } = require('./exercises/addQuiz/updateQuizQuestion');
const { addAnotherQuizQuestionToQuiz } = require('./exercises/addQuiz/addAnotherQuizQuestionToQuiz');
const { deleteAddQuizQuestion } = require('./exercises/addQuiz/deleteAddQuizQuestion');
const { addPictureQuizQuestionToVideo } = require('./exercises/addPictureQuiz/addPictureQuizQuestionToVideo');
const { deleteAddPictureQuizQuestion } = require('./exercises/addPictureQuiz/deleteAddPictureQuizQuestion');
const { updatePictureQuizQuestion } = require('./exercises/addPictureQuiz/updatePictureQuizQuestion');
const { addAnotherPictureQuizQuestionToQuiz } = require('./exercises/addPictureQuiz/addAnotherPictureQuizQuestionToQuiz');
const { addMatchingGameToVideo } = require('./exercises/addMatchingGame/addMatchingGameToVideo');
const { deleteMatchingGameQuestion } = require('./exercises/addMatchingGame/deleteMatchingGameQuestion');
const { editMatchingGameQuestion } = require('./exercises/addMatchingGame/editMatchingGameQuestion');
const { addCrunchChallenge } = require('./exercises/addCrunchChallenge/addCrunchChallenge');
const { addCodingChallenge } = require('./exercises/addCodingChallenge/addCodingChallenge');
const { addCodingProject } = require('./exercises/addCodingProject/addCodingProject');
const { deleteExercise } = require('./exercises/deleteExercise');
const { updateCourse } = require('./updateCourse');
const { recordExercisePlayed } = require('./recordExercisePlayed');
const { reviewCourse } = require('./reviewCourse');
const { courseByStatus } = require('./courseByStatus');

module.exports = {
  courses,
  singleCourse,
  createCourse,
  addSectionToCourse,
  addVideoToSection,
  deleteSection,
  deleteVideo,
  addQuizQuestionToVideo,
  updateSectionDetails,
  updateVideoDetails,
  updateQuizQuestion,
  addAnotherQuizQuestionToQuiz,
  deleteAddQuizQuestion,
  addPictureQuizQuestionToVideo,
  deleteAddPictureQuizQuestion,
  updatePictureQuizQuestion,
  addAnotherPictureQuizQuestionToQuiz,
  addMatchingGameToVideo,
  deleteMatchingGameQuestion,
  editMatchingGameQuestion,
  addCrunchChallenge,
  addCodingChallenge,
  addCodingProject,
  deleteExercise,
  updateCourse,
  recordExercisePlayed,
  reviewCourse,
  courseByStatus
};
