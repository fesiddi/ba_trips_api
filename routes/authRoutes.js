import express from 'express';
import authController from '../controllers/authController.js';
import {
  validateRegister,
  validateLogin,
} from '../middlewares/validateAuth.js';

const router = express.Router();

router.post('/login', validateLogin, authController.login);

router.post('/register', validateRegister, authController.register);

export default router;
