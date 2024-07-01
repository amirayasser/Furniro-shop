import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "@customTypes/shared";
import { TProduct } from "@customTypes/product";
import actGetProdById from "./act/actGetProdById";
import actSearchForProdByTitle from "./act/actSearchForProdByTitle";

interface IProductsState {
  records: TProduct | [] | TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState: IProductsState = {
  records: [],
  loading: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // by id
    builder.addCase(actGetProdById.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProdById.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetProdById.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });


    // search for prod
    builder.addCase(actSearchForProdByTitle.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actSearchForProdByTitle.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actSearchForProdByTitle.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

  }
});


export { actGetProdById, actSearchForProdByTitle };
export default productSlice.reducer;


