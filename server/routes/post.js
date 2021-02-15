const router = require("express").Router();
const { json } = require("express");
const pool = require("../db");
const authorization = require("../middleware/authorization");

// GET ALL POSTS
router.get("/all", async (req, res) => {
  try {
    const posts = await pool.query("SELECT * FROM posts");

    res.json(posts.rows);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

// GET POSTS FROM USER
router.get("/users/:user", authorization, async (req, res) => {
  try {
    const searchID = req.params.user;
    
    const posts = await pool.query("SELECT * FROM posts WHERE author = $1", [searchID]);
    
    res.json(posts.rows);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

// GET SAVED POSTS FROM USERS

// GET LIKED POSTS FROM USERS


// GET POSTS FROM FOLLOWED USERS
router.get("/following", authorization, async (req, res) => {
  try {
    let following = []; // array of followed users that would be retrieved from the db
    var postsToRes = [];
    var itemsProcessed = 0;
    
    const resPosts = async () => {
      res.json(postsToRes);
    }

    following.forEach(async item => {
      const posts = await pool.query("SELECT * FROM posts WHERE author = $1", [item]);
      const newPost = posts.rows[0];
      postsToRes = [...postsToRes, newPost];
      itemsProcessed++;

      if(itemsProcessed === following.length) {
        resPosts();
      }

    });
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

//LIKE POST
router.post("/like", async (req, res) => {
  try {
    const { username, postid } = req.body;

    const addLike = await pool.query("UPDATE posts SET likes = likes + 1 WHERE postid = $1", [postid]);

    const getPost = await pool.query("SELECT * FROM posts WHERE postid = $1", [postid]); 
    let toAddID = getPost.rows[0].postid;

    const likedList = await pool.query("SELECT liked FROM users WHERE username = $1", [username]);
    let likedArray = likedList.rows;

    var newLikedarray = [...likedArray, toAddID];
    var newLikedarrayJSON = JSON.stringify(newLikedarray).toString();

    const addToLiked = await pool.query("UPDATE users SET liked = $1 WHERE username = $2", [newLikedarrayJSON, username]);

    res.json("Post liked sucesfully");
  } catch (err) {
    res.status(500).json(err.message);
    console.error(err.message);
  }
});

//BOOKMARK POST

// CREATE POST
router.post("/create", authorization, async (req, res) => {
  try {
    const { title, artist, link, author, tags } = req.body;

    let tagsObject = {
      tags : [...tags]
    }

    await pool.query("INSERT INTO posts (title, artist, link,  author, tags) VALUES ($1, $2, $3, $4, $5) RETURNING *", 
      [title, artist, link, author, tagsObject]);

    res.json("Posted Sucessfully");
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

// DELETE POST 
router.delete("/delete", authorization, async (req, res) => {
  try {
    const body = req.body;
    const id = body.postid;
    
    await pool.query("DELETE FROM posts WHERE postId = $1", [id]);

    res.json("Post deleted sucessfully");
    
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;