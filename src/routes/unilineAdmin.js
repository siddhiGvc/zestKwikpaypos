import express from 'express';
import validate from 'express-validation';
import * as UnilineUsersController from '../controllers/UnilineUser/user.controller';
// import * as userController from '../controllers/user/user.controller';
import * as  saveLogin from "../controllers/UnilineUser/saveLogin"
import * as userValidator from '../controllers/user/user.validator';
const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.post(
    '/login',
    validate(userValidator.login),
    UnilineUsersController.login,
  );
  router.get(
    '/login/token',
    UnilineUsersController.tokenLogin,
  );
  router.post(
    '/register',
    validate(userValidator.register),
    UnilineUsersController.register,
  );
  
router.get('/allUnilineUsers', UnilineUsersController.allUnilineUsers);
router.get('/UnilineUsers', UnilineUsersController.get);
router.post('/saveUnilineUser', UnilineUsersController.saveUnilineUsers);
router.get('/UnilineUser/delete', UnilineUsersController.deleteUnilineUsers);
router.post('/UnilineUser/changePassword', UnilineUsersController.changeUnilineUsersPassword);
router.post('/savelogin',saveLogin.saveLogin);
router.post('/getloginfo',saveLogin.getLogInfo);

module.exports = router;
