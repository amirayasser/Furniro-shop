import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type TResponse = TProduct[]

const actGetAllProds = createAsyncThunk(
    "products/actGetAllProds",
    async (_, thunkapi) => {
        const { rejectWithValue } = thunkapi;
        try {
            const res = await axios.get<TResponse>('/products')
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

export default actGetAllProds;