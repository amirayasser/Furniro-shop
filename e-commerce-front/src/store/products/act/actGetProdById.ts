import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const actGetProdById = createAsyncThunk(
    "products/actGetProdById",
    async (id: number, thunkapi) => {
        const { rejectWithValue } = thunkapi;
        try {
            const res = await axios.get<TProduct>(`/products?id=${id}`)
            const data = res.data
            return data;
        } catch (error) {
            // here i need to know if this error related to axios 
            if (axios.isAxiosError(error)) {
                return rejectWithValue(error.response?.data.message || error.message);
            }
            else {
                return rejectWithValue('unexpected error')
            }
        }
    })


export default actGetProdById ;

