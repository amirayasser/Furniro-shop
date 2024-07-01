import { TOrderItems } from "@customTypes/order.type";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "@store/index";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";


const actPlaceOrder = createAsyncThunk('orders/actPlaceOrder',
    async (subtotal: number, thunkAPI) => {
        const { getState, rejectWithValue } = thunkAPI;
        const { cartSlice, authSlice } = getState() as RootState;

        const basicFormat = new Date()
        const date = basicFormat.toLocaleDateString()
        const time = basicFormat.toLocaleTimeString()
        console.log(basicFormat.toLocaleDateString())
        console.log(basicFormat.toLocaleTimeString())

        // Prepare products without quantity information
        const prodswithoutQ = cartSlice.products.map(cp => ({
            id: cp.id,
            title: cp.title,
            price: cp.newPrice || cp.price,
            img: cp.img,
        }));

        // Map over cart items to create orderItems array with quantities
        const orderItems = Object.keys(cartSlice.items).map(prodId => {
            // Find the product in prodswithoutQ that matches prodId
            const productWithoutQ = prodswithoutQ.find(pnoq => pnoq?.id.toString() === prodId);
            if (productWithoutQ) {
                return {
                    id: productWithoutQ.id,
                    title: productWithoutQ.title,
                    price: productWithoutQ?.newPrice || productWithoutQ.price,
                    img: productWithoutQ.img,
                    quantity: cartSlice.items[prodId],
                };
            }
            return null; // Handle case where product ID from cart items doesn't match products
        }).filter(Boolean); // Filter out any null values


        console.log(cartSlice.products)

        try {
            const res = await axios.post<TOrderItems>('/orders', {
                userId: authSlice.user?.id,
                itemsList: orderItems,
                subtotal,
                orderDate: {
                    date, time
                }
            })
            return res.data;

        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
)


export default actPlaceOrder;
