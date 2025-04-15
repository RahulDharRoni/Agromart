const express = require("express");
const cors = require('cors'); // Import cors
const fs = require("fs/promises");
const app = express();
const port = 5000;

app.use(cors());

// GET API route using async/await
app.get("/home", async (req, res) => {
  try {
    const data = await fs.readFile("./products.json", "utf8");
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error("Error reading products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
