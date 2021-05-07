import express from 'express';

import authenticator from '../middleware/authenticator';
import { getAllBugs,addBug,deleteBug,getBug,updateBug } from '../controllers/bug';
import {authorizer} from '../middleware/authorizer';

const router = express.Router();

//Bugs
router.get("/projects/:projectId/bugs",authenticator,authorizer,getAllBugs);
router.post("/projects/:projectId/bugs",authenticator,authorizer,addBug);

//Bug
router.get("/projects/:projectId/bugs/:bugId",authenticator,authorizer,getBug);
router.delete("/projects/:projectId/bugs/:bugId",authenticator,authorizer,deleteBug);
router.put("/projects/:projectId/bugs/:bugId",authenticator,authorizer,updateBug);


export default router;