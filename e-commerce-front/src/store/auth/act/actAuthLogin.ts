import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";

type TFormData ={
    email:string;
    password: string;
}

type TResponse = {
    accessToken: string;
    user:{
        id:number;
        name: string;
        email:string;
        password: string;
    }
}

const actAuthLogin = createAsyncThunk('auth/actAuthLogin', async (formData:TFormData , thunk)=>{

    const {rejectWithValue} = thunk;

    try {
         const res = await axios.post<TResponse>('/login', formData)
         return res.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error))
    }
   

})

export default actAuthLogin;
