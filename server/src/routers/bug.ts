import express from 'express';

import authenticator,{authorizer} from '../middleware/authenticator';
import { getAllBugs,addBug,deleteBug,getBug,updateBug } from '../controllers/bug';

const router = express.Router();

router.get("/projects/:projectId/bugs",authenticator,authorizer, getAllBugs);
router.post("/projects/:projectId/bugs",authenticator,authorizer,addBug);

router.get("/projects/:projectId/bugs/:bugId",authenticator,authorizer,getBug);
router.delete("/projects/:projectId/bugs/:bugId",authenticator,authorizer,deleteBug);
router.put("/projects/:projectId/bugs/:bugId",authenticator,authorizer,updateBug);

export default router;