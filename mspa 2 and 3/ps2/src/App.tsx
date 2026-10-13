import React, { useState } from 'react';
import { Product, CartItem } from './types';
import { ProductCard } from './ProductCard';
export const App: React.FC = () => {
const [products, setProducts] = useState<Product[]>([]);
const [cart, setCart] = useState<CartItem[]>([]);
const fetchProducts = (): void => {
fetch('https://fakestoreapi.com/products?limit=4')
.then(res => res.json())
.then((data: any[]) => {
const mapped: Product[] = data.map(item => ({
id: item.id,
title: item.title.slice(0, 25) + '...',
price: item.price
}));
setProducts(mapped);
})
.catch(err => console.error(err));
};
const addToCart = (product: Product): void => {
const item: CartItem = { ...product, cartItemId: Date.now() + Math.random() };
setCart(prev => [...prev, item]);
};
const removeFromCart = (cartItemId: number): void => {
setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
};
const grandTotal = cart.reduce((acc, item) => acc + item.price, 0);
return (
<div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '24px', background: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
<h2>Shopping Cart Application</h2>
<button onClick={fetchProducts} style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' }}>
Fetch Products from API
</button>
<h3>Available Products</h3>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
{products.map(p => (
<ProductCard key={p.id} product={p} onAddToCart={addToCart} />
))}
</div>
<hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
<h3>Your Cart</h3>
<div style={{ display: 'flex', justifyContent: 'space-between', background: '#f1f5f9', padding: '12px 16px', borderRadius: '6px', marginBottom: '16px' }}>
<span>Total Items: <strong>{cart.length}</strong></span>
<span>Grand Total: <strong>${grandTotal.toFixed(2)}</strong></span>
</div>
<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
{cart.map(item => (
<li key={item.cartItemId} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #e2e8f0' }}>
<span>{item.title} - ${item.price.toFixed(2)}</span>
<button onClick={() => removeFromCart(item.cartItemId)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
Remove
</button>
</li>
))}
</ul>
</div>
);
};
export default App;