CREATE DATABASE trackdrop;

CREATE TABLE users (
  userId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  userEmail VARCHAR(255) NOT NULL,
  userPassword VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
  postId SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  tags JSON,
  likes INT DEFAULT 0
);

INSERT INTO posts (title, link, author, tags) 
  VALUES ('Song', 'youtube.com/watch?v=jHfio97', 'producer', '{["electronic", "dubstep"]}');