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


const prodsByCatPrefix = createSlice({
    name: "related prods",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      
        // by cat-prefix
        builder.addCase(actGetProdByCatPrefix.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetProdByCatPrefix.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.records = action.payload;
        });
        builder.addCase(actGetProdByCatPrefix.rejected, (state, action) => {
            state.loading = 'failed';
            if (action.payload && typeof action.payload === 'string') {
                state.error = action.payload;
            }
        });

    }
});

export { actGetProdByCatPrefix };
export default prodsByCatPrefix.reducer;