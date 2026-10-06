// Initial array of objects
let cart = [
  { id: 1, name: "Laptop", price: 50000, quantity: 1 },
  { id: 2, name: "Mouse", price: 800, quantity: 2 },
  { id: 3, name: "Keyboard", price: 1500, quantity: 1 }
];

let nextId = 4;

// 1. push() - Add Item
function addItem() {
  let name = document.getElementById("name").value;
  let price = Number(document.getElementById("price").value);
  let qty = Number(document.getElementById("qty").value);

  if (name === "" || price <= 0 || qty <= 0) {
    alert("Please fill all fields!");
    return;
  }

  // Push new object into array
  cart.push({ id: nextId++, name: name, price: price, quantity: qty });

  // Clear input boxes
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";

  showCart();
}

// 2. filter() - Delete Item
function deleteItem(id) {
  cart = cart.filter(item => item.id !== id);
  showCart();
}

// 3. Update Table, map(), and reduce()
function showCart() {
  let tableBody = document.getElementById("cartTable");
  tableBody.innerHTML = "";

  // Loop through array to make rows
  cart.forEach(item => {
    tableBody.innerHTML += `
      <tr>
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>₹${item.price}</td>
        <td>${item.quantity}</td>
        <td><button onclick="deleteItem(${item.id})">Delete</button></td>
      </tr>
    `;
  });

  // map() - extract only names
  let names = cart.map(item => item.name);
  document.getElementById("namesList").innerText = names.join(", ");

  // reduce() - calculate total
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById("totalPrice").innerText = total;
}

// First time page open hone par load karein
showCart();