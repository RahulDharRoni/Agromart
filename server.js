const express = require("express");
const cors = require("cors"); // Import cors
const fs = require("fs/promises");
const app = express();
const port = 5000;
const path = require("path");



app.use(cors());
app.use(express.json());
const DATA_FILE = path.join(__dirname, "products.json");


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

// POST API to receive and save product
app.post("/api/products", (req, res) => {
  const newProduct = req.body;

  // Read current data
  fs.readFile(DATA_FILE, "utf-8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).json({ message: "Error reading file" });
    }

    const existing = data ? JSON.parse(data) : [];
    existing.push(newProduct);

    // Write updated data
    fs.writeFile(DATA_FILE, JSON.stringify(existing, null, 2), (err) => {
      if (err) return res.status(500).json({ message: "Error writing file" });

      res
        .status(201)
        .json({ message: "Product saved successfully", product: newProduct });
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
