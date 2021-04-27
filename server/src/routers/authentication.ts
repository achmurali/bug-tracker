import express from 'express'

import { signupUser } from '../controllers/auth';

const router = express.Router();

//router.use('/login',);
router.use('/signup',signupUser);

export default router;