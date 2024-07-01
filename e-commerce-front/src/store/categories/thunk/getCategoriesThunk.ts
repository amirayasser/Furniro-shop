import { TCategory } from "@customTypes/category";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type TResponse = TCategory[]

const actGetCateg = createAsyncThunk(
    "categories/actGetCateg", 
    async (_, thunkapi) => {
    const { rejectWithValue } = thunkapi;
    try {
        const res = await axios.get<TResponse>('/categories')
        const data = res.data
        return data;
    } catch (error) {
        // here i need to know if this error related to axios 
        if (axios.isAxiosError(error))
            {
               return rejectWithValue(error.response?.data.message || error.message);
            }  
        else {
            return rejectWithValue('unexpected error')
        }
    }
})


export default actGetCateg;

