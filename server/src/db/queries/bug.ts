//BUG 
export const addBug = `INSERT INTO bugs(project_id,"createdBy_userId",bug_id) VALUES($1::uuid,$2,$3::uuid) RETURNING *`;

export const deleteBug = "DELETE FROM bugs WHERE project_id = $1::uuid AND bug_id = $2::uuid RETURNING *";

//BUG DETAILS
export const addBugDetails = `INSERT INTO bugs_details("bugId",name,description,"updatedBy",priority,status) VALUES($1::uuid,$2::text,$3::text,$4,$5::text,$6::text) RETURNING *`;

export const getBugDetails = `SELECT * FROM bugs_details WHERE "bugId" = $1::uuid`;

//BUG -- BUG DETAILS
export const getAllBugs = `SELECT bugs.project_id,bugs."createdBy_userId",bugs.bug_id,bugs.created_timestamp,
bugs_details.name,bugs_details.description,bugs_details."updatedBy",
bugs_details.priority,bugs_details.status,bugs_details."updatedTimestamp",
COUNT(DISTINCT notes.noteid) as notes
FROM bugs INNER JOIN bugs_details ON bugs.bug_id = bugs_details."bugId" 
LEFT OUTER JOIN notes ON notes.bugid = bugs.bug_id 
WHERE bugs.project_id = $1::uuid
GROUP BY bugs.bug_id,bugs_details.name,bugs_details.description,bugs_details."updatedBy",
bugs_details.priority,bugs_details.status,bugs_details."updatedTimestamp"
ORDER BY bugs.created_timestamp,bugs_details."updatedTimestamp"`;

export const getBug = `SELECT * FROM bugs INNER JOIN bugs_details ON bugs.bug_id = bugs_details."bugId" WHERE bugs.project_id = $1::uuid AND bugs.bug_id = $2::uuid`;

export const updateBugDetails = `UPDATE bugs_details SET (name,description,"updatedBy",priority,status,"updatedTimestamp") = ($1,$2,$3,$4,$5,$6) RETURNING *`;