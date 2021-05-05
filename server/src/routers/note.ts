import express from 'express';

import { getAllNotes,addNote,updateNote,deleteNote, getNote } from '../controllers/note';
import authenticator, { authorizer } from '../middleware/authenticator';

const router = express.Router();

//Notes
router.get("/",authenticator,authorizer,getAllNotes);
router.post("/",authenticator,authorizer,addNote);

//Note
router.get("/:noteId",authenticator,authorizer,getNote);
router.put("/:noteId",authenticator,authorizer,updateNote);
router.delete("/:noteId",authenticator,authorizer,deleteNote);


export default router;