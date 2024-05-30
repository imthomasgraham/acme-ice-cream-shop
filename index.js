const express = require("express");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();
const port = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/flavors", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM flavors ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
