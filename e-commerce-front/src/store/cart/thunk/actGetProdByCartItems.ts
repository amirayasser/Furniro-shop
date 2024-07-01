import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TProduct } from "@customTypes/product";
import { RootState } from "@store/index";

type TResponse = TProduct[]

const actGetProdByCartItems = createAsyncThunk('cart/actGetProdByCartItems',
    async(_, thunkAPI)=>{
        const {rejectWithValue , fulfillWithValue, getState} = thunkAPI
       
        const {cartSlice , authSlice} = getState() as RootState;
       
        const itemsId = Object.keys(cartSlice.items).map(Number); // Convert keys to numbers
       
        if(!itemsId.length){
            return fulfillWithValue([]);
        }
        
        try {

             if( cartSlice.currUserId === authSlice.user?.id){            
                 // Construct the query string with the IDs of the products in the cart
                //  const queryString = itemsId.map(id => `id=${id}`).join('&');
                 const requests = itemsId.map(id => axios.get<TProduct>(`http://localhost:3333/products?id=${id}`));
                 const responses = await Promise.all(requests);
                 const responseData = responses.map(response => response.data);
                 const flatData = responseData.flatMap(products => products);
                 
                 return   flatData;
                } 
                else if (!cartSlice.currUserId || !authSlice.user?.id){
                 console.log('you are not register')
                 return fulfillWithValue([]);
                }
                else {
                    console.log('current user has not items in cart')
                 return fulfillWithValue([])
                }
            } catch (error) {
            if(axios.isAxiosError(error)){
                return rejectWithValue(error.response?.data.message || error.message)
            } else {
                rejectWithValue('unexpected error')
            }

        }
    }
);

export default actGetProdByCartItems;