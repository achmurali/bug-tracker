import express from 'express';

import * as projects from '../controllers/projects';

const router = express.Router();

router.get("/projects",projects.getAllProjects);
router.post("/projects",projects.addProject);
router.get("/project/:id",projects.getProject);

export default router;