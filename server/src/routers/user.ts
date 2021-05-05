import express from 'express';

import { getAllUsers } from '../controllers/user';
import authenticator from '../middleware/authenticator';

const router = express.Router();

router.get("/users" ,authenticator, getAllUsers);

export default router;