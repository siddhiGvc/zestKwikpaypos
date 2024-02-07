import express from 'express';
import * as userController from '../controllers/user/user.controller';

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.get('/allUsers', userController.allUsers);
router.get('/users', userController.get);
router.post('/user', userController.saveUser);
router.get('/user/delete', userController.deleteUser);
router.post('/user/changePassword', userController.changeUserPassword);

module.exports = router;
