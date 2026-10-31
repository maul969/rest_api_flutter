const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');
const auth = require('../middleware/auth');

router.get('/user', auth, userController.findAll);
router.post('/user', auth, userController.create);
router.put('/user/:id', auth, userController.update);
router.delete('/user/:id', auth, userController.delete);

module.exports = router;
