const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// REGISTERING
router.post("/register", validInfo, async (req, res) => {
  try {
    // 1. DESTRUCTIRE THE REQ.BODY(NAME, EMAIL, PASSWORD)
    const { name, email, password } = req.body;

    // 2. CHECK IF USER EXISTS (IF USER EXIST => THROW ERROR)
    const user = await pool.query("SELECT * FROM users WHERE useremail = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    // 3. BCRYPT THE USER PASSWORD
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    // 4. ENTER THE NEW USER INSIDE OUR DB
    const newUser = await pool.query(
      "INSERT INTO users (username, useremail, userpassword) VALUES ($1, $2, $3) RETURNING *",
      [name, email, bcryptPassword]
    );

    // 5. GENERATING OUR JWT TOKEN
    const token = jwtGenerator(newUser.rows[0].userid);
    res.json({ token });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// LOGIN ROUTE //
router.post("/login", validInfo, async (req, res) => {
  try {
    // 1. DESTRUCTURE THE REQ.BODY
    const { email, password } = req.body;

    // 2. CHECK IF USER EXISTS (IF NOT THEN WE THROW ERROR)
    const user = await pool.query("SELECT * FROM users WHERE useremail = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }
    // 3. CHECK IF THE INCOMING PASSWORD IS THE SAME AS THE ONE IN THE DATABASE
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].userpassword
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credentials");
    }

    // 4. GIVE THEM THE JWT TOKEN
    const token = jwtGenerator(user.rows[0].userid);

    res.json({ token });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;