import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


type TResponse = TProduct[]

const actGetProdByCatPrefix = createAsyncThunk(
    "products/actGetProdsByCatPrefix", 
    async (catPrefix:string, thunkapi) => {
    const { rejectWithValue } = thunkapi;
        try {
            const res = await axios.get<TResponse>(catPrefix === 'all' ? `/products` : `/products?cat_prefix=${catPrefix}`);
            const data = res.data;
            return data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                return rejectWithValue(axiosError.response?.data.message || "An error occurred while fetching products.");
            } else {
                return rejectWithValue("An unexpected error occurred.");
            }
        }
    })


export default actGetProdByCatPrefix;

