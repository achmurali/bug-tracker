//Project
export const getAllProjects = `SELECT t.*,COUNT(DISTINCT project_users.user_id) as members,COUNT(bugs.bug_id) as bugs
FROM (SELECT DISTINCT projects.* FROM projects LEFT OUTER JOIN project_users ON
projects.id = project_users.project_id WHERE projects.admin = $1 OR project_users.user_id = $1) t LEFT OUTER JOIN project_users ON t.id = project_users.project_id
LEFT OUTER JOIN bugs ON bugs.project_id = t.id GROUP BY t.id,t.name,t.timestamp,t.admin`;

export const getProject = 'SELECT * FROM projects WHERE id = $1';

export const addProject = 'INSERT INTO projects(id,name,admin) VALUES($1::uuid,$2::text,$3) RETURNING name,id';

export const updateProjectName = 'UPDATE projects SET name = $1 WHERE id = $2::uuid RETURNING id,name';

export const deleteProject = 'DELETE FROM projects WHERE id = $1::uuid RETURNING *';

export const checkAdminProject = "SELECT * FROM projects WHERE id = $1::uuid AND admin = $2";

//Project -- Members
export const getProjectMembers = 'SELECT * FROM project_users WHERE project_id = $1::uuid';

export const addProjectMembers = 'INSERT INTO project_users(project_id,user_id) VALUES($1::uuid,$2) RETURNING *';

export const deleteProjectMember = 'DELETE FROM project_users WHERE user_id = $2 AND project_id = $1::uuid RETURNING *';

export const isProjectMember = 'SELECT * FROM project_users WHERE project_id = $1::uuid AND user_id = $2';