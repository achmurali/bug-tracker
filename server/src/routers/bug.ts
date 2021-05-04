import express from 'express';

import authenticator from '../middleware/authenticator';
import { getAllBugs,addBug,deleteBug,getBug,updateBug } from '../controllers/bug';

const router = express.Router();

router.get("/projects/:projectId/bugs",authenticator,getAllBugs);
router.post("/projects/:projectId/bugs",authenticator,addBug);

router.get("/project/:projectId/bug/:bugId",authenticator,getBug);
router.delete("/project/:projectId/bug/:bugId",authenticator,deleteBug);
router.put("/project/:projectId/bug/:bugId",authenticator,updateBug);

export default router;