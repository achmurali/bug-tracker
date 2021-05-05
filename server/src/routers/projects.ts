import express from 'express';

import * as projects from '../controllers/projects';
import authenticator, { authorizer,adminAuthorizer } from '../middleware/authenticator';

const router = express.Router();

//Projects
router.get("/projects", authenticator, projects.getAllProjects);
router.post("/projects", authenticator, projects.addProject);

//Singular Project
router.get("/projects/:projectId", authenticator, authorizer, projects.getProjectHandler);
router.put("/projects/:projectId", authenticator, adminAuthorizer, projects.updateProject);
router.delete("/projects/:projectId", authenticator, adminAuthorizer, projects.deleteProject);

export default router;