const express = require('express');
const TagsController = require('../controllers/tagsController');

const router = express.Router();

// GET all tags
router.get('/', TagsController.getAllTags);

router.get('/:tagName', TagsController.retrieveTag);

module.exports = router;
