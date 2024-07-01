import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from '@utils/axiosErrorHandler';


type TFormData = {
    name:string,
    email: string,
    password: string
}

const actAuthRegister = createAsyncThunk(
    "auth/actAuthRegister",
     async (formData:TFormData , thunk) => {
        const {rejectWithValue} = thunk;
    
        try {
            const response = await axios.post('/register', formData)
            return response.data;

        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error))
        }
}); 

export default actAuthRegister
