export interface Product {
id: number;
title: string;
price: number;
}
export interface CartItem extends Product {
cartItemId: number;
}