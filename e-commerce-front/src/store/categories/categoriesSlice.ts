import { createSlice } from "@reduxjs/toolkit";
import actGetCateg from "./thunk/getCategoriesThunk";
import {  TLoading } from "@customTypes/shared";
import { TCategory } from "@customTypes/category";


interface ICategoriesState {
  records: TCategory[];

  loading: TLoading;

  error: string | null;
}

const initialState: ICategoriesState = {
  records: [],
  loading: 'idle',
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder.addCase(actGetCateg.pending, (state)=>{
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCateg.fulfilled, (state, action)=>{
      state.loading = "succeeded";
      state.records = action.payload;
    });
    builder.addCase(actGetCateg.rejected, (state , action)=>{
      state.loading = 'failed';
      if(action.payload && typeof action.payload === 'string'){
              state.error = action.payload;
      }
    });
   
  }
});

export {actGetCateg};
export default categoriesSlice.reducer;
