let products = [];
let cart = [];
const productGrid = document.getElementById("productGrid");
const cartList = document.getElementById("cartList");
const totalItems = document.getElementById("totalItems");
const totalPrice = document.getElementById("totalPrice");
const fetchBtn = document.getElementById("fetchBtn");
function renderProducts() {
productGrid.innerHTML = products
.map(function (product) {
return `
<div class="product-card">
<h4>${product.title}</h4>
<p>$${product.price.toFixed(2)}</p>
<button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
</div>
`;
})
.join("");
}
function renderCart() {
cartList.innerHTML = cart
.map(function (item) {
return `
<li class="cart-item">
<span>${item.title} - $${item.price.toFixed(2)}</span>
<button class="btn-remove" onclick="removeFromCart(${item.cartItemId})">Remove</button>
</li>
`;
})
.join("");
totalItems.textContent = cart.length;
const total = cart.reduce(function (acc, item) {
return acc + item.price;
}, 0);
totalPrice.textContent = total.toFixed(2);
}
window.addToCart = function (productId) {
const product = products.find(function (p) {
return p.id === productId;
});
if (product) {
cart.push({ ...product, cartItemId: Date.now() + Math.random() });
renderCart();
}
};
window.removeFromCart = function (cartItemId) {
cart = cart.filter(function (item) {
return item.cartItemId !== cartItemId;
});
renderCart();
};
fetchBtn.addEventListener("click", function () {
fetch("https://fakestoreapi.com/products?limit=4")
.then(function (res) {
return res.json();
})
.then(function (data) {
products = data.map(function (item) {
return {
id: item.id,
title: item.title.slice(0, 25) + "...",
price: item.price
};
});
renderProducts();
})
.catch(function (err) {
console.error(err);
});
});