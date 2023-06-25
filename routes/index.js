const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/api/users', userController.getAllUsers);
router.post('/api/users', userController.createNewUser);
router.get('/api/users/:userId', userController.getSingleUserById);
router.put('/api/users/:userId', userController.updateUserById);
router.delete('/api/users/:userId', userController.deleteUserById);
router.post(
  '/api/users/:userId/friends/:friendId',
  userController.addNewFriend
);
router.delete(
  '/api/users/:userId/friends/:friendId',
  userController.deleteFriend
);
router.get('/api/thoughts', userController.getAllThoughts);
router.get('/api/thoughts/:thoughtId', userController.getSingleThoughtById);
router.post('/api/thoughts', userController.createNewThought);
router.put('/api/thoughts/:thoughtId', userController.updateThoughtById);
router.delete('/api/thoughts/:thoughtId', userController.deleteThoughtById);
router.post(
  '/api/thoughts/:thoughtId/reactions',
  userController.createReaction
);
router.delete(
  '/api/thoughts/:thoughtId/reactions',
  userController.deleteReaction
);

module.exports = router;
