import express from 'express';
import { registerUser, authUser } from '../controllers/authController.js';

const router = express.Router();

// Registration route: /api/auth/register
router.post('/register', registerUser);

// Login route: /api/auth/login
router.post('/login', authUser);

export default router;