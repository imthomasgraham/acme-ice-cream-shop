const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const app = express();
const port = 3000;

const pool = new Pool({
  connectionString:
    "postgresql://tjbwa:Tdgtdgtdg12@localhost:5432/acme_ice_cream_shop",
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
