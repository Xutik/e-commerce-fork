import "./homeproducts.css";
import { renderShop } from "../../shop/shop.js";

export function homeProducts() {
  const contentContainer = document.querySelector(".content-container");
  const HomeProductsContainer = document.createElement("div");
  HomeProductsContainer.classList.add("home-products-container");

  const title = document.createElement("h1");
  title.textContent = "Better choices, better prices";
  title.classList.add("home-products-title");
  HomeProductsContainer.appendChild(title);

  const products = getProducts("all"); // Get all products (from the "all" category)

  // Limit the number of products to 8
  const limitedProducts = products.slice(0, 8); // Always take the first 8 products

  const homeproduct = document.createElement("div");
  homeproduct.classList.add("homeproduct");
  HomeProductsContainer.appendChild(homeproduct);

  homeproduct.innerHTML = ""; // Clear any previous content inside productsContainer

  // Loop through the limited products and create HTML for each one
  limitedProducts.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");

    productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image"/>
            <div class="title-price">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
            </div>
            <p class="product-description hidden">${product.description}</p>
            <div class="svg-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="svg-info">
                    <title>information-outline</title>
                    <path d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z" />
                </svg>
                <button class="Add-to-cart-button">Add to cart</button>
            </div>
       `;

    // Add event listener for toggling description
    const svgInfo = productElement.querySelector(".svg-info");
    svgInfo.addEventListener("click", () => {
      const titlePrice = productElement.querySelector(".title-price");
      const productImage = productElement.querySelector(".product-image");
      const productDescription = productElement.querySelector(
        ".product-description"
      );

      // Toggle visibility of elements
      if (productDescription.classList.contains("hidden")) {
        titlePrice.style.display = "none";
        productImage.style.display = "none";
        productDescription.classList.remove("hidden");
      } else {
        titlePrice.style.display = "flex";
        productImage.style.display = "block";
        productDescription.classList.add("hidden");
      }
    });

    // Append the product to the container
    homeproduct.appendChild(productElement);
  });

  const button = document.createElement("button");
  button.textContent = "See more products";
  button.classList.add("home-products-button");
  button.addEventListener("click", () => {
    renderShop();
  });
  HomeProductsContainer.appendChild(button);

  contentContainer.append(HomeProductsContainer);
}

function getProducts(category) {
  try {
    let products = localStorage.getItem("products");
    products = JSON.parse(products);

    const filteredProducts =
      category === "all" ? products : filterCategory(products, category);

    return filteredProducts;
  } catch (error) {
    console.error("There are no products in local storage", error);
    return [];
  }
}
