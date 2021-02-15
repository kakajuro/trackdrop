const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// GET FOLLOWERS
router.get("/followers", async (req, res) => {
  try {
    const { username } = req.body;

    const followers = await pool.query("SELECT followers FROM users WHERE username = $1", [username]);
    
    const array = followers.rows[0].followers;
    const followerCount = array.length;

    res.json({
      "followerCount": followerCount, 
      "followers": array
    });
  } catch (err) {
    res.status(500).json("Server Error");
    console.error(err.message);
  }
});


module.exports = router;