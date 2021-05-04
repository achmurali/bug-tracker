//BUG 
export const addBug = `INSERT INTO bugs(project_id,"createdBy_userId",bug_id) VALUES($1::uuid,$2,$3::uuid) RETURNING *`;


//BUG DETAILS
export const addBugDetails = `INSERT INTO bugs_details("bugId",name,description,"updatedBy",priority,status,"updatedTimestamp") VALUES($1::uuid,$2::text,$3::text,$4,$5::text,$6::text,$7) RETURNING *`;

//BUG -- BUG DETAILS
export const getAllBugs = `SELECT * FROM bugs INNER JOIN bugs_details ON bugs.bug_id = bugs_details."bugId" WHERE bugs.project_id = $1::uuid`;