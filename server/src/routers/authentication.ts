import express from 'express'

import { signupUser,loginUser } from '../controllers/auth';

const router = express.Router();

router.use('/login',loginUser);
router.use('/signup',signupUser);

export default router;