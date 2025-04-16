const form = document.getElementById("productForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const product = {
    title: document.getElementById("title").value,
    image: document.getElementById("image").value,
    rating: parseFloat(document.getElementById("rating").value),
    reviews: parseInt(document.getElementById("reviews").value),
    originalPrice: parseFloat(document.getElementById("originalPrice").value),
    discountedPrice: parseFloat(
      document.getElementById("discountedPrice").value
    ),
    discountLabel: document.getElementById("discountLabel").value,
    quantity: parseInt(document.getElementById("quantity").value),
  };
  console.log(product);

  try {
    const res = await axios.post("http://localhost:5000/api/products", product);
    console.log(res);
    alert("Product submitted successfully!");

    // Close modal and reset
    bootstrap.Modal.getInstance(document.getElementById("productModal")).hide();
    form.reset();
  } catch (err) {
    console.error("Error submitting product:", err);
    alert("Error submitting product.");
  }
});
