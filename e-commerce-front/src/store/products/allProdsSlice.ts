import { createSlice } from "@reduxjs/toolkit";
import actGetAllProds from "./act/getAllProductThunk";
import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";
import actGetProdByCatPrefix from "./act/getProductsByCPerfixThunk";



interface IProductsState {
    records: TProduct[];

    loading: TLoading;

    error: string | null;
}

const initialState: IProductsState = {
    records: [],
    loading: 'idle',
    error: null,
};


const allProducts = createSlice({
    name: "allProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(actGetAllProds.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetAllProds.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetAllProds.rejected, (state, action) => {
            state.loading = 'failed';
            if (action.payload && typeof action.payload === 'string') {
                state.error = action.payload;
            }
        });

    }
});

export { actGetAllProds }
export default allProducts.reducer;