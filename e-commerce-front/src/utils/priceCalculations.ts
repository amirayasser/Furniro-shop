import { TProduct } from "@customTypes/product";

// Calculate the subtotal price for each product in the cart
export const calcSubPrice = (products: TProduct[], items: { [key: string]: number }) => {
    const subPrice: { [key: string]: number } = {};

    products.forEach(product => {
        const quantity = items[product.id] || 0;
        const price = parseFloat(product.newPrice || product.price);
        subPrice[product.id] = price * quantity;
    });

    return subPrice;
};

// Calculate the total price of the cart
export const calcTotalPrice = (subprice: { [key: string]: number }) => {
    return Object.values(subprice).reduce((total, price) => total + price, 0);
};
