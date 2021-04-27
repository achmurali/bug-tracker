export const insertNewUser  = 'INSERT INTO users(username,password) VALUES($1::text,$2::text)';

export const checkUsernameExists = 'SELECT * FROM users WHERE username = $1::text';

export const getUser = 'SELECT username,password FROM users WHERE username = $1::text';