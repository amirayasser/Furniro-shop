import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosErrorHandler from '@utils/axiosErrorHandler';

// Create async thunk for toggling wishlist items
const actLikeToggle = createAsyncThunk(
    'wishlist/actLikeToggle',
    async ({ userId, productId }: { userId: number, productId: number }, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;

        try {
            // Check if record exists in the wishlist
            const response = await axios.get(`http://localhost:3333/wishlist?userId=${userId}&productId=${productId}`);

            if (response.data.length > 0) {
                // If record exists, delete it
                const deletedItemId = response.data[0].id;
                await axios.delete(`http://localhost:3333/wishlist/${deletedItemId}`);
                return { type: 'remove', id: productId };
            } else {
                // If record does not exist, add it
                await axios.post('http://localhost:3333/wishlist', { userId, productId });
                return { type: 'add', id: productId };
            }
        } catch (error) {
            return rejectWithValue(axiosErrorHandler(error));
        }
    }
);

export default actLikeToggle;
