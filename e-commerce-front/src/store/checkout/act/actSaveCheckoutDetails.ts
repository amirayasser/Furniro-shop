import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@store/index";
import { TBillsData } from "@customTypes/checkout";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

const actSaveCheckoutDetails = createAsyncThunk('/checkout/actSaveCheckoutDetails',
    async (formData: TBillsData, thunkAPI) => {
        const { rejectWithValue, getState } = thunkAPI;
        const { authSlice } = getState() as RootState;
        try {

            const res = await axios.post('/checkOutBillsData', {
                firstName: formData.firstName || authSlice.user?.name,
                lastName: formData.lastName,
                email: formData.email || authSlice.user?.email,
                address: formData.address,
                city: formData.city,
                zipCode: formData.zipCode,
                phone: formData.phone,
                userId: formData.userId || authSlice.user?.id
            });

            return res.data;

        } catch (error) {
            rejectWithValue(axiosErrorHandler(error))
        }
    }
)


export default actSaveCheckoutDetails;
