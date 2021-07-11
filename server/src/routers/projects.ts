import express from 'express';

import * as projects from '../controllers/projects';
import authenticator from '../middleware/authenticator';
import  { authorizer,adminAuthorizer } from '../middleware/authorizer';

const router = express.Router();

//Projects
router.get("/projects", authenticator, projects.getAllProjects);
router.post("/projects", authenticator, projects.addProject);

//Singular Project
router.get("/projects/:projectId", authenticator, authorizer, projects.getProjectHandler);
router.get("/projects/:projectId/members", authenticator, authorizer, projects.getProjectMembers);
router.put("/projects/:projectId", authenticator, adminAuthorizer, projects.updateProject);
router.delete("/projects/:projectId", authenticator, adminAuthorizer, projects.deleteProject);

export default router;