const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const UsersController = require('../controllers/usersController');

// Sign up
router.post('/signup', UsersController.signUp);

// Facebook authentication
router.post('/facebook', UsersController.facebookAuthentication);

// GET user
router.post('/get-user', UsersController.getUser);

// Forgot password
router.post('/forgot', UsersController.forgotPassword);

// Forgot Password Change
router.post('/forgot/:token', UsersController.forgotPasswordChange);

// Update customized tags
router.post('/update-customized-tags', checkAuth, UsersController.updateCustomizedTags);

// Update user analytics
router.post('/analytics', checkAuth, UsersController.updateUserAnalytics);

// Update user
router.post('/edit', checkAuth, UsersController.editUser);

// Delete user
router.delete('/:userId', checkAuth, UsersController.deleteUser);

// Sign In
router.post('/login', UsersController.login);

// Add course videos watched
router.post('/add-course-videos-watched', UsersController.addCourseVideosWatched);

// Add course quiz
router.post('/add-course-quiz', UsersController.addCourseQuizPlayed);

// Get top users
router.get('/get-top-users', UsersController.getTopUsers);

//cta user
router.post('/cta-user', UsersController.ctaUser);

// Update user organization
router.post('/update-user-organization', UsersController.updateUserOrganization);

// Create stripe account
router.post('/create-stripe-account', UsersController.createStripeAccount);

// handle payment
router.post('/handle-course-payment', UsersController.handleCoursePayment);



module.exports = router;
