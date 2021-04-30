export const getAllProjects = 'SELECT * FROM projects';

export const getProject = 'SELECT * FROM projects WHERE id = $1';

export const addProject = 'INSERT INTO projects(id,name,admin) VALUES($1::uuid,$2::text,$3)';