const express = require('express');
const singleUpload = require('./singleFileUpload');
const singleVideoUpload = require('./singleVideoUpload');
const fileLocationManager = require('./returnFileLocation');
const removeSingleUpload = require('./removeSingleUpload');
const VerifyAuthenticationStrict = require('../middleware/verifyAuthenticationStrict');
const router = express.Router();

router.post('/single-upload', VerifyAuthenticationStrict.verify, singleUpload.single('singleFile'), fileLocationManager.returnFileLocation);
router.post('/single-video', VerifyAuthenticationStrict.verify, singleVideoUpload.single('singleVideo'), fileLocationManager.returnFileLocation);
router.post('/remove-single-upload', removeSingleUpload.remove);

module.exports = router;
