const router = require("express").Router();
const pool = require("../db");
const validURL = require("../middleware/validURL");
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

// CREATE POST
router.post("/create", validURL, async (req, res) => {
  try {
    const { title, link, author, tags } = req.body;

    let tagsObject = {
      tags : [...tags]
    }

    await pool.query("INSERT INTO posts (title, link, author, tags) VALUES ($1, $2, $3, $4)", 
      [title, link, author, tagsObject]);

    res.json("Posted Sucessfully");
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;