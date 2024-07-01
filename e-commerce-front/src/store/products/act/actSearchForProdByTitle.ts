import { TProduct } from "@customTypes/product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosErrorHandler from "@utils/axiosErrorHandler";
import axios from "axios";





const actSearchForProdByTitle = createAsyncThunk('/products/actSearchForProdByTitle',
    async (prodName: string | null, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {

            const res = await axios.get(`/products`);
            const data: TProduct[] = res.data;

            if (!prodName || prodName.trim() === '') {
                return [];
            } else {

                const filtered = data.filter(el => el.title.toLowerCase().includes(prodName.toLowerCase()));
                console.log('filterd serach from act', filtered)
                return filtered;
            }

        } catch (error) {
            rejectWithValue(axiosErrorHandler(error))
        }

    }
)

export default actSearchForProdByTitle;
