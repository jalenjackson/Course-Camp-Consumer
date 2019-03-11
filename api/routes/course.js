const express = require('express');
const upload = require('../imageUpload/courseImageUpload');
const videoUpload = require('../imageUpload/videoMulter');
const froalas3 = require('../imageUpload/froalas3');
const matchgameUpload = require('../imageUpload/matchgameUpload');
const uploadPicQuizImage = require('../imageUpload/picQuizImageUpload');
const checkAuth = require('../middleware/checkAuth');
const CoursesController = require('../controllers/coursesController');

const router = express.Router();

// Create course
router.post('/', checkAuth, upload.single('courseImage'), CoursesController.createNewCourse);

// Adds a new section
router.post('/add-new-section', checkAuth, CoursesController.addNewSection);

// Remove a section
router.post('/remove-section', CoursesController.removeSection);

// Save section data
router.post('/save-section-data', CoursesController.saveSectionData);

// Edit video
router.post('/edit-video', CoursesController.editVideo);

// Add quiz to video
router.post('/add-quiz-to-video', CoursesController.addQuizToVideo);

// Remove quiz from video
router.post('/remove-quiz-from-video', CoursesController.removeQuizFromVideo);

// Get all courses
router.get('/all-courses', CoursesController.getAllCourses);

// Add a video to section
router.post('/add-video-to-section', videoUpload.single('video'), CoursesController.addVideoToSection);

// Delete video
router.post('/delete-video', CoursesController.deleteVideo);

// Update video position
router.post('/update-video-position', CoursesController.updateVideoPosition);

// Update section position
router.post('/update-section-position', CoursesController.updateSectionPosition);

// Edit course
router.post('/edit', checkAuth, videoUpload.single('video'), CoursesController.updateCourse);

// get course
router.get('/:courseId', CoursesController.getCourse);

// update Course video
router.post('/edit-videos', CoursesController.updateVideos);

// Add coding challenge to video
router.post('/add-coding-challenge', CoursesController.addCodingChallengeToVideo);

//Add crunch to video
router.post('/add-crunch', CoursesController.addCrunchToVideo);

//Add coding project
router.post('/add-coding-project', CoursesController.addCodingProject);

//Add picture quiz
router.post('/add-picture-quiz', uploadPicQuizImage.fields([{name: 'pictureAnswer1'}, {name: 'pictureAnswer2'}, {name: 'pictureAnswer3'}, {name: 'pictureAnswer4'}]), CoursesController.addPictureAnswerQuiz);

// Add Match Game
router.post('/add-match-game', matchgameUpload.single('optionalImage'), CoursesController.addMatchGame);

// Delete Picture Quiz Question
router.post('/delete-picture-quiz-question', CoursesController.deletePictureQuizQuestion);

// Delete Match Game Question
router.post('/delete-match-game-question', CoursesController.deleteMatchGameQuestion);

// Delete Crunch Answer
router.post('/delete-crunch-answer', CoursesController.deleteCrunchAnswer);

// Remove Element From Video
router.post('/remove-element-from-video', CoursesController.removeElementFromVideo);

// Upload froala s3 image
router.post('/froala-s3', froalas3.single('uploadFroalaImage'), CoursesController.sendFroalaLink);


module.exports = router;
