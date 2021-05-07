import express from 'express';

import { getAllNotes,addNote,updateNote,deleteNote, getNote } from '../controllers/note';
import authenticator from '../middleware/authenticator';
import  { authorizer, noteAuthorizer } from '../middleware/authorizer';

const router = express.Router();

//Notes
router.get("/projects/:projectId/bugs/:bugId/notes",authenticator,authorizer,getAllNotes);
router.post("/projects/:projectId/bugs/:bugId/notes",authenticator,authorizer,addNote);

//Note
router.get("/projects/:projectId/bugs/:bugId/notes/:noteId",authenticator,authorizer,getNote);
router.put("/projects/:projectId/bugs/:bugId/notes/:noteId",authenticator,authorizer,noteAuthorizer,updateNote);
router.delete("/projects/:projectId/bugs/:bugId/notes/:noteId",authenticator,authorizer,noteAuthorizer,deleteNote);


export default router;