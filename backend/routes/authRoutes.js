import express from 'express'
const router = express.Router()
import { register, login,verifyCode,resendCode} from '../controllers/authController.js';

// Authentication Routes
router.post('/register', register);
router.post('/login', login);
router.post('/verifyCode', verifyCode);
router.post('/resendCode', resendCode);
export default router;