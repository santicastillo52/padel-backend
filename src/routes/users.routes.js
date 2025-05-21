const express = require('express');
const userController = require('../controllers/users.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/users', JWTmiddleware, userController.getAllUsers);
router.get('/users/:id', userController.getUserById);


module.exports = router;