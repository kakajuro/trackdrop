/* To clear current data from database*/
TRUNCATE TABLE users;
TRUNCATE TABLE posts;
ALTER SEQUENCE posts RESTART WITH 1;