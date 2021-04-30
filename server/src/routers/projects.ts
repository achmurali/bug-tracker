import express from 'express';

import * as projects from '../controllers/projects';
import authenticator from '../middleware/authenticator';

const router = express.Router();

router.get("/projects", authenticator, projects.getAllProjects);
router.post("/projects", authenticator, projects.addProject);
router.get("/project/:id", authenticator, projects.getProject);

export default router;