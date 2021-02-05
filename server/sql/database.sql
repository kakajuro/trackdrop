CREATE DATABASE trackdrop;

CREATE TABLE users (
  userId uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) NOT NULL,
  userEmail VARCHAR(255) NOT NULL,
  userPassword VARCHAR(255) NOT NULL,
  saved JSON DEFAULT '[]',
  liked JSON DEFAULT '[]'
);

CREATE TABLE posts (
  postId SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  link VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  tags JSON,
  likes INT DEFAULT 0
);