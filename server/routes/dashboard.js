const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //  AFTER AUTHORIZATION REQ.USER HAS THE PAYLOAD
    // res.json(req.user);

    const user = await pool.query("SELECT * FROM users WHERE userid = $1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

module.exports = router;
