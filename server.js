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
app.post("/api/products", async (req, res) => {
  const newProduct = req.body;

  try {
    let data = [];

    try {
      const fileContent = await fs.readFile(DATA_FILE, "utf8");
      data = JSON.parse(fileContent);
    } catch (err) {
      // If file doesn't exist, start with an empty array
      if (err.code !== "ENOENT") throw err;
    }

    data.push(newProduct);

    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");

    res
      .status(201)
      .json({ message: "Product saved successfully", product: newProduct });
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ message: "Error saving product" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
