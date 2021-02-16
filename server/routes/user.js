const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// GET FOLLOWERS
router.get("/followers", async (req, res) => {
  try {
    const { username } = req.body;

    const followersArray = await pool.query("SELECT followers FROM users WHERE username = $1", [username]);
    
    const array = followersArray.rows[0];

    if (followersArray.rows === undefined) {
      res.json({
        "followerCount": 0, 
        "followers": []
      });
    } else {
      const followerCount = array.length;
      
      res.json({
        "followerCount": followerCount, 
        "followers": array
      });
    }

  } catch (err) {
    res.status(500).json("Server Error");
    console.error(err.message);
  }
});

//GET FOLLOWING
router.get("/following", async (req, res) => {
  try {
    const { username } = req.body;

    const followingArray = await pool.query("SELECT followed FROM users WHERE username = $1", [username]);
    
    const array = followingArray.rows[0];

    if (followingArray.rows === undefined) {
      res.json({
        "followingCount": 0, 
        "following": []
      });
    } else {
      const followingCount = array.length;
      
      res.json({
        "followingCount": followingCount, 
        "following": array
      });
    }

  } catch (err) {
    res.status(500).json("Server Error");
    console.error(err.message);
  }
});

// GET LIKED POSTS FROM USER
router.get("/liked", async (req, res) => {
  try {
    const { username } = req.body;
    
    const likedArray = await pool.query("SELECT liked FROM users WHERE username = $1", [username]);

    const array = likedArray.rows[0];
    var itemsProcessed = 0;

    if (likedArray.rows === undefined) {
      res.json({
        "areLikes": false
      });
    } else {
      const likeCount = array.length;

      const resPosts = async () => {
        res.json({
          "likeCount": likeCount,
          "posts": postsToRes
        });
      }

      array.forEach(async item => {
        const posts = await pool.query("SELECT * FROM posts WHERE postid = $1", [item]);
        const newPost = posts.rows[0];
        postsToRes = [...postsToRes, newPost];
        itemsProcessed++;

        if (itemsProcessed === array.length) {
          resPosts();
        }

      });
    }

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

// GET BOOKMARKED POSTS FROM USER
router.get("/bookmarked", async (req, res) => {
  try {
    const { username } = req.body;

    const bookmarkedArray = await pool.query("SELECT saved FROM users WHERE username = $1", [username]);

    const array = bookmarkedArray.rows[0];
    var itemsProcessed = 0;    

    if (bookmarkedArray.rows === undefined) {
      res.json({
        "areBookmarks": false
      });
    } else {
      const bookmarkCount = array.length;

      const resPosts = async () => {
        res.json({
          "bookmarkCount": bookmarkCount,
          "bookmarks": array
        });
      }

      array.forEach(async item => {
        const posts = await pool.query("SELECT * FROM posts WHERE postid = $1", [item]);
        const newPost = posts.rows[0];
        postsToRes = [...postsToRes, newPost];
        itemsProcessed++;

        if (itemsProcessed === array.length) {
          resPosts();
        }
      });

    }

  } catch (err) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;