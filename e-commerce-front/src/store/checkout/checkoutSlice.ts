import { createSlice } from "@reduxjs/toolkit";
import actSaveCheckoutDetails from "./act/actSaveCheckoutDetails";
import { TLoading } from "@customTypes/shared";
import { TBillsData } from "@customTypes/checkout";


export interface ICheckout {
    billingData: TBillsData[],
    loading: TLoading,
    error: string | null
}

const initialState: ICheckout = {
    billingData: [],
    loading: 'idle',
    error: null
}


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actSaveCheckoutDetails.pending, (state) => {
            state.loading = 'pending';
            state.error = null;
        });
        builder.addCase(actSaveCheckoutDetails.fulfilled, (state, action) => {
            console.log('State before update:', state.billingData);
            console.log('Action payload:', action.payload);
            state.loading = 'succeeded';
            state.billingData = [...state.billingData, action.payload]; // Append payload to billingData array
            // state.billingData.push(action.payload); // Use push to add to array
            console.log('State after update:', state.billingData);
            state.error = null;
        });
        builder.addCase(actSaveCheckoutDetails.rejected, (state, action) => {
            state.loading = 'failed';
            state.error = action.payload as string;
        });
    }
})


export default checkoutSlice.reducer;