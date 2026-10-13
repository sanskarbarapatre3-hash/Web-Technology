import React from 'react';
import { Product } from './types';
interface ProductCardProps {
product: Product;
onAddToCart: (product: Product) => void;
}
export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
return (
<div style={{ border: '1px solid #e2e8f0', borderRadius: '6px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
<h4 style={{ margin: '0 0 8px 0', fontSize: '1rem' }}>{product.title}</h4>
<p style={{ margin: '0 0 12px 0', color: '#10b981', fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
<button onClick={() => onAddToCart(product)} style={{ background: '#10b981', color: '#fff', border: 'none', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
Add to Cart
</button>
</div>
);
};