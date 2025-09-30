const express = require('express');
const userController = require('../controllers/users.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');
const checkUserOwnership = require('../middlewares/userCheckMdw');


const router = express.Router();

router.get('/users', JWTmiddleware, userController.getAllUsers);
router.get('/users/:id', JWTmiddleware, userController.getUserById);
router.patch('/users-update/:id', JWTmiddleware, checkUserOwnership, userController.updateUser);


module.exports = router;