import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actAuthRegister from "./act/actAuthRegister";
import actAuthLogin from "./act/actAuthLogin";
import { string } from "zod";

interface IAuthState{
    user : {
        id:number;
        email:string;
        name:string;
    } | null;
    accessToken: string | null;
    loading: TLoading;
    error: string | null;
}

const initialState: IAuthState ={
    user: null,
    accessToken: null,
    loading: 'idle',
    error: null,
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        resetUI: (state)=>{
            state.loading = 'idle';
            state.error = null;
        },
        authLogout: (state)=>{
            state.accessToken = null;
            state.user = null;
        }
    },
    extraReducers:(builder)=>{
        // register
        builder.addCase(actAuthRegister.pending, (state)=>{
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(actAuthRegister.fulfilled, (state)=>{
            state.loading = 'succeeded';
            state.error = null;
        });
        builder.addCase(actAuthRegister.rejected, (state , action)=>{
           state.loading = 'failed';
           if(typeof action.payload === 'string' ){
               state.error = action.payload;
           }
        })
        // login
        builder.addCase(actAuthLogin.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actAuthLogin.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        });
        builder.addCase(actAuthLogin.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof(action.payload) === 'string') {
                state.error = action.payload;
            }
        });
    },

});

export { actAuthRegister, actAuthLogin };
export const {resetUI ,authLogout} = authSlice.actions
export default authSlice.reducer;