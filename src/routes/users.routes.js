const express = require('express');
const userController = require('../controllers/users.controller');
const JWTmiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

router.get('/users', JWTmiddleware, userController.getAllUsers);

module.exports = router;