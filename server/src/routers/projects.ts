import express from 'express';

import * as projects from '../controllers/projects';
import authenticator from '../middleware/authenticator';

const router = express.Router();

//Projects
router.get("/projects", authenticator, projects.getAllProjects);
router.post("/projects", authenticator, projects.addProject);

//Singular Project
router.get("/project/:id", authenticator, projects.getProjectHandler);
router.put("/project/:id", authenticator, projects.updateProject);
router.delete("/project/:id", authenticator,projects.deleteProject);

export default router;