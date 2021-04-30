//Project
export const getAllProjects = 'SELECT * FROM projects';

export const getProject = 'SELECT * FROM projects WHERE id = $1';

export const addProject = 'INSERT INTO projects(id,name,admin) VALUES($1::uuid,$2::text,$3) RETURNING name,id';

export const updateProjectName = 'UPDATE projects SET name = $1 WHERE id = $2::uuid RETURNING name';

export const deleteProject = 'DELETE FROM project WHERE id = $1::uuid';

//Project -- Members
export const getProjectMembers = 'SELECT * FROM project_users WHERE project_id = $1::uuid';

export const addProjectMembers = 'INSERT INTO project_users(project_id,user_id) VALUES($1::uuid,$2) RETURNING *';

export const deleteProjectMember = 'DELETE FROM project_users WHERE user_id = $2 AND project_id = $1::uuid RETURNING *';