import { TOrderItems } from "@customTypes/order.type";
import { TLoading } from "@customTypes/shared";
import { createSlice } from "@reduxjs/toolkit";
import actPlaceOrder from "./act/actPlaceOrder";

interface IOrderSlice {
    orderList: TOrderItems[]
    loading: TLoading,
    error : string | null,
}

const initialState:IOrderSlice = {
    orderList : [],
    loading: 'idle',
    error: null
}

const orderSlice = createSlice({

    name:'orders',
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(actPlaceOrder.pending , (state) => {
            state.loading = 'pending';
            state.error = null;
        })
        builder.addCase(actPlaceOrder.fulfilled , (state , action) => {
            console.log('Action payload in fulfilled:', action.payload);

            state.loading = 'succeeded';
            state.orderList.push(action.payload);
            state.error = null;
        })
        builder.addCase(actPlaceOrder.rejected , (state , action) => {
            state.loading = "failed";
            state.error = action.payload as string;
        })
    }

})


export default orderSlice.reducer;