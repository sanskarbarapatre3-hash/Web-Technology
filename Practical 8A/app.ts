interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

let cart: Product[] = [
  { id: 1, name: "Laptop", price: 50000, quantity: 1 },
  { id: 2, name: "Mouse", price: 800, quantity: 2 },
  { id: 3, name: "Keyboard", price: 1500, quantity: 1 }
];

let nextId: number = 4;

function addToCart(product: Product): void {
  cart.push(product);
  render();
}

function removeItem(id: number): void {
  cart = cart.filter((item: Product): boolean => item.id !== id);
  render();
}

function getProductNames(): string[] {
  return cart.map((item: Product): string => item.name);
}

function calculateTotal(): number {
  return cart.reduce(
    (total: number, item: Product): number => total + item.price * item.quantity,
    0
  );
}

function render(): void {
  const tbody = document.getElementById("cartTable") as HTMLTableSectionElement;
  tbody.innerHTML = "";

  cart.forEach((item: Product): void => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>${item.quantity}</td>
      <td><button onclick="removeItem(${item.id})">Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  (document.getElementById("namesList") as HTMLElement).innerText = getProductNames().join(", ");
  (document.getElementById("totalPrice") as HTMLElement).innerText = calculateTotal().toString();
}

// Event Listener
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
addBtn.addEventListener("click", (): void => {
  const nameInput = document.getElementById("name") as HTMLInputElement;
  const priceInput = document.getElementById("price") as HTMLInputElement;
  const qtyInput = document.getElementById("qty") as HTMLInputElement;

  const name: string = nameInput.value.trim();
  const price: number = Number(priceInput.value);
  const qty: number = Number(qtyInput.value);

  if (name === "" || isNaN(price) || price <= 0 || isNaN(qty) || qty <= 0) {
    alert("Please fill all fields with valid values!");
    return;
  }

  const newProduct: Product = {
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

// Window scope for inline HTML button
(window as any).removeItem = removeItem;

render();
export {};