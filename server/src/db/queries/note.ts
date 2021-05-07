export const getAllNotes = 'SELECT * FROM notes WHERE bugid = $1::uuid';

export const getNote = 'SELECT * FROM notes WHERE bugid = $1::uuid AND noteid = $2::uuid';

export const isNoteAdmin = 'SELECT * FROM notes WHERE bugid = $1::uuid AND noteid = $2::uuid AND createdby = $3'

export const getNotePartial = 'SELECT bugid,notedid,note FROM notes WHERE bugid = $1::uuid AND noteid = $2::uuid';

export const addNote = 'INSERT INTO notes(bugid,note,createdby,noteid) VALUES($1::uuid,$2::text,$3,$4::uuid) RETURNING *';

export const deleteNote = 'DELETE FROM notes WHERE bugid = $1::uuid AND noteid = $2::uuid RETURNING *';

export const updateNote = 'UPDATE notes SET (note,updatedat) = ($1::text,$2) WHERE bugid = $3 AND noteid = $4 RETURNING *';