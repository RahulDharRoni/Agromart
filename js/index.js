const productList = document.getElementById("product-list");

function renderRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let starHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starHTML += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>`;
  }

  if (halfStar) {
    starHTML += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-half"></use></svg>`;
  }

  return starHTML;
}

async function loadProducts() {
  try {
    const response = await axios.get("http://localhost:5000/home");
    const products = response.data;
    console.log(products);
    productList.innerHTML = ""; // Clear existing

    products.forEach((product) => {
      const col = document.createElement("div");
      col.className = "col";

      col.innerHTML = `
        <div class="col">
            <div class="product-item">
                <figure>
                    <a href="index.html" title="Product Title">
                      <img src=${product.image} alt="Product Thumbnail" class="tab-image">
                    </a>
                  </figure>
                  <div class="d-flex flex-column text-center">
                    <h3 class="fs-6 fw-normal">${product.title}</h3>
                    <div>
                      <span class="rating">
                        <svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>
                        <svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>
                        <svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>
                        <svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>
                        <svg width="18" height="18" class="text-warning"><use xlink:href="#star-half"></use></svg>
                      </span>
                      <span>(${product.reviews})</span>
                    </div>
                    <div class="d-flex justify-content-center align-items-center gap-2">
                      <del>${product.originalPrice}</del>
                      <span class="text-dark fw-semibold">${product.discountedPrice}</span>
                      <span class="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">${product.discountLabel}</span>
                    </div>
                    <div class="button-area p-3 pt-0">
                      <div class="row g-1 mt-2">
                        <div class="col-3"><input type="number" name="quantity" class="form-control border-dark-subtle input-number quantity" value="1"></div>
                        <div class="col-7"><a href="#" class="btn btn-primary rounded-1 p-2 fs-7 btn-cart"><svg width="18" height="18"><use xlink:href="#cart"></use></svg> Add to Cart</a></div>
                        <div class="col-2"><a href="#" class="btn btn-outline-dark rounded-1 p-2 fs-6"><svg width="18" height="18"><use xlink:href="#heart"></use></svg></a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
      `;

      productList.appendChild(col);
    });
  } catch (error) {
    productList.innerHTML = "<p>Error loading products</p>";
    console.error("Error fetching products:", error);
  }
}

loadProducts();

// Featured products
async function loadPopularProducts() {
  try {
    const response = await axios.get("http://localhost:5000/home"); // Or your API endpoint
    const allProducts = response.data;
    console.log(allProducts);
    const filteredProducts = allProducts.filter(
      (product) => product.reviews > 100
    );
    console.log(filteredProducts);
    console.log(filteredProducts);
    const swiperWrapper = document.getElementById("popular-products");
    swiperWrapper.innerHTML = ""; // Clear previous content

    filteredProducts.forEach((product) => {
      swiperWrapper.innerHTML += `
        <div class="product-item swiper-slide">
          <figure>
            <a href="index.html" title="${product.title}">
              <img
                src="${product.image}"
                alt="${product.title}"
                class="tab-image"
              />
            </a>
          </figure>
          <div class="d-flex flex-column text-center">
            <h3 class="fs-6 fw-normal">${product.title}</h3>
            <div>
              <span class="rating">
                ${generateRatingStars(product.rating)}
              </span>
              <span>(${product.reviews})</span>
            </div>
            <div class="d-flex justify-content-center align-items-center gap-2">
              <del>$${product.originalPrice.toFixed(2)}</del>
              <span class="text-dark fw-semibold">$${product.discountedPrice.toFixed(
                2
              )}</span>
              <span class="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                ${product.discountLabel}
              </span>
            </div>
            <div class="button-area p-3 pt-0">
              <div class="row g-1 mt-2">
                <div class="col-3">
                  <input
                    type="number"
                    name="quantity"
                    class="form-control border-dark-subtle input-number quantity"
                    value="${product.quantity}"
                  />
                </div>
                <div class="col-7">
                  <a href="#" class="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                    <svg width="18" height="18"><use xlink:href="#cart"></use></svg>
                    Add to Cart
                  </a>
                </div>
                <div class="col-2">
                  <a href="#" class="btn btn-outline-dark rounded-1 p-2 fs-6">
                    <svg width="18" height="18"><use xlink:href="#heart"></use></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Reinitialize swiper if needed
    if (typeof Swiper !== "undefined") {
      new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        },
      });
    }
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

// Helper function to create star ratings
function generateRatingStars(rating) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  let starsHtml = "";

  for (let i = 0; i < fullStars; i++) {
    starsHtml += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>`;
  }
  if (halfStar) {
    starsHtml += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-half"></use></svg>`;
  }
  return starsHtml;
}

// Call the function on load
document.addEventListener("DOMContentLoaded", loadPopularProducts);

////////////////////////////////////////////////////////////////////
//Most Popular Products
async function fetchTopReviewedProducts() {
  try {
    const response = await axios.get("http://localhost:5000/home");
    const products = response.data;

    // Sort products by review count descending and get top 5
    const topReviewed = products
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, 5);
    console.log(topReviewed);
    // Get swiper wrapper element
    const swiperWrapper = document.getElementById("most-popular-products");
    swiperWrapper.innerHTML = ""; // Clear existing slides

    // Inject new slides
    topReviewed.forEach((product) => {
      const starsFull = Math.floor(product.rating);
      const starHalf = product.rating % 1 >= 0.5 ? 1 : 0;

      let starsHTML = "";
      for (let i = 0; i < starsFull; i++) {
        starsHTML += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-full"></use></svg>`;
      }
      if (starHalf) {
        starsHTML += `<svg width="18" height="18" class="text-warning"><use xlink:href="#star-half"></use></svg>`;
      }

      swiperWrapper.innerHTML += `
        <div class="product-item swiper-slide">
          <figure>
            <a href="index.html" title="${product.title}">
              <img src="${
                product.image
              }" alt="Product Thumbnail" class="tab-image" />
            </a>
          </figure>
          <div class="d-flex flex-column text-center">
            <h3 class="fs-6 fw-normal">${product.title}</h3>
            <div>
              <span class="rating">
                ${starsHTML}
              </span>
              <span>(${product.reviews})</span>
            </div>
            <div class="d-flex justify-content-center align-items-center gap-2">
              <del>$${product.originalPrice.toFixed(2)}</del>
              <span class="text-dark fw-semibold">$${product.discountedPrice.toFixed(
                2
              )}</span>
              <span class="badge border border-dark-subtle rounded-0 fw-normal px-1 fs-7 lh-1 text-body-tertiary">
                ${product.discountLabel}
              </span>
            </div>
            <div class="button-area p-3 pt-0">
              <div class="row g-1 mt-2">
                <div class="col-3">
                  <input type="number" name="quantity" class="form-control border-dark-subtle input-number quantity" value="${
                    product.quantity
                  }" />
                </div>
                <div class="col-7">
                  <a href="#" class="btn btn-primary rounded-1 p-2 fs-7 btn-cart">
                    <svg width="18" height="18"><use xlink:href="#cart"></use></svg>
                    Add to Cart
                  </a>
                </div>
                <div class="col-2">
                  <a href="#" class="btn btn-outline-dark rounded-1 p-2 fs-6">
                    <svg width="18" height="18"><use xlink:href="#heart"></use></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Reinitialize swiper if needed
    if (typeof Swiper !== "undefined") {
      new Swiper(".swiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        },
      });
    }
  } catch (error) {
    console.error("Error fetching top reviewed products:", error);
  }
}

// Call the function on page load
fetchTopReviewedProducts();
