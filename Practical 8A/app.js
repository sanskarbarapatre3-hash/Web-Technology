// Initial Data
var cart = [
  { id: 1, name: "Laptop", price: 50000, quantity: 1 },
  { id: 2, name: "Mouse", price: 800, quantity: 2 },
  { id: 3, name: "Keyboard", price: 1500, quantity: 1 }
];

var nextId = 4;

// 1. push() - Add Item
function addToCart(product) {
  cart.push(product);
  render();
}

// 2. filter() - Delete Item
function removeItem(id) {
  cart = cart.filter(function (item) { return item.id !== id; });
  render();
}

// 3. map() - Extract Names
function getProductNames() {
  return cart.map(function (item) { return item.name; });
}

// 4. reduce() - Calculate Total
function calculateTotal() {
  return cart.reduce(function (total, item) {
    return total + item.price * item.quantity;
  }, 0);
}

// 5. Render DOM
function render() {
  var tbody = document.getElementById("cartTable");
  if (!tbody) return;

  tbody.innerHTML = "";
  cart.forEach(function (item) {
    var tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + item.id + "</td>" +
      "<td>" + item.name + "</td>" +
      "<td>₹" + item.price + "</td>" +
      "<td>" + item.quantity + "</td>" +
      "<td><button onclick=\"removeItem(" + item.id + ")\">Delete</button></td>";
    tbody.appendChild(tr);
  });

  var namesElem = document.getElementById("namesList");
  if (namesElem) namesElem.innerText = getProductNames().join(", ");

  var totalElem = document.getElementById("totalPrice");
  if (totalElem) totalElem.innerText = calculateTotal();
}

// Add Item Button click listener
window.addEventListener("DOMContentLoaded", function () {
  var addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.addEventListener("click", function () {
      var nameInput = document.getElementById("name");
      var priceInput = document.getElementById("price");
      var qtyInput = document.getElementById("qty");

      var name = nameInput.value.trim();
      var price = Number(priceInput.value);
      var qty = Number(qtyInput.value);

      if (name === "" || isNaN(price) || price <= 0 || isNaN(qty) || qty <= 0) {
        alert("Please enter valid details!");
        return;
      }

      var newProduct = {
        id: nextId++,
        name: name,
        price: price,
        quantity: qty
      };

      addToCart(newProduct);

      nameInput.value = "";
      priceInput.value = "";
      qtyInput.value = "";
      nameInput.focus();
    });
  }

  // Initial load
  render();
});