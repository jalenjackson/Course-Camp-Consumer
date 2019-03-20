const express = require('express');
const VerifyAuthenticationStrict = require('../middleware/verifyAuthenticationStrict');
const reorderSections = require('./sections/reorderSections');
const changeCourseStatus = require('./changeCourseStatus');
const getVideoUrl = require('./getVideoUrl');
const router = express.Router();

router.post('/reorder-sections', VerifyAuthenticationStrict.verify, reorderSections.call);
router.post('/change-course-status', changeCourseStatus.call);
router.get('/get-video-url', getVideoUrl.call);

module.exports = router;
