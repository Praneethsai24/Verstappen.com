const cartDrawer = document.getElementById("cartDrawer");
const cartToggle = document.getElementById("cartToggle");
const closeCartButton = document.getElementById("closeCart");
const cartItemsContainer = document.getElementById("cartItems");
const cartTotalDisplay = document.getElementById("cartTotal");
const cartCountDisplay = document.getElementById("cartCount");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------- Cart Persistence ---------- */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ---------- Update UI ---------- */
function updateCartUI() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    itemElement.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price}</span>
    `;

    cartItemsContainer.appendChild(itemElement);
  });

  cartTotalDisplay.textContent = "Total: $" + total;
  cartCountDisplay.textContent = cart.length;
}

/* ---------- Add to Cart ---------- */
document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    cart.push({ name, price });
    saveCart();
    updateCartUI();
  });
});

/* ---------- Toggle Cart ---------- */
cartToggle.addEventListener("click", () => {
  cartDrawer.classList.toggle("open");
});

closeCartButton.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
});

updateCartUI();