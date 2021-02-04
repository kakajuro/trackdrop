const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// CREATE POST
router.post("/create", async (req, res) => {
  try {
    const { title, link, author, tags } = req.body;

    let tagsObject = {
      tags : [...tags]
    }

    await pool.query("INSERT INTO posts (title, link, author, tags) VALUES ($1, $2, $3, $4) RETURNING *", 
      [title, link, author, tagsObject]);

    res.json("Posted Sucessfully");
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

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
router.get("/:user", async (req, res) => {
  try {
    const searchID = req.params.user;

    const posts = await pool.query("SELECT * FROM posts WHERE author = $1", [searchID]);
    
    res.json(posts.rows);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

// DELETE POST 
router.delete("/delete", async (req, res) => {
  try {
    const body = req.body;
    const id = body.postid;

    await pool.query("DELETE FROM posts WHERE postId = $1", [id]);

    res.json("Post deleted sucessfully");

  } catch (err) {
    res.status(500).json("Server Error");
    console.error(err.message);
  }
});

module.exports = router;