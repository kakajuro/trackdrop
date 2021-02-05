/* To clear current data from database*/
TRUNCATE TABLE users;
TRUNCATE TABLE posts;
TRUNCATE TABLE posts RESTART IDENTITY CASCADE;