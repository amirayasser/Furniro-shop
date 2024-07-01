import { createSlice } from "@reduxjs/toolkit";
import actLikeToggle from "./act/actLikeToggle";
import { authLogout } from "@store/auth/authSlice";
import actGetWishList from "./act/actGetWishList";
import { TProduct } from "@customTypes/product";
import { TLoading } from "@customTypes/shared";

interface IWishlist {
    itemsId: number[];
    productsFullInfo: TProduct[];
    error: null | string;
    loading: TLoading;
}

const initialState: IWishlist = {
    itemsId: [],
    productsFullInfo: [],
    error: null,
    loading: "idle",
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        cleanWishlistProductsFullInfo: (state) => {
            state.productsFullInfo = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(actLikeToggle.pending, (state) => {
            state.error = null;
        });
        builder.addCase(actLikeToggle.fulfilled, (state, action) => {
            if (action.payload.type === "add") {
                state.itemsId.push(action.payload.id);
            } else {
                state.itemsId = state.itemsId.filter((el) => el !== action.payload.id);
                state.productsFullInfo = state.productsFullInfo.filter(
                    (el) => el.id !== action.payload.id
                );
            }
        });
        builder.addCase(actLikeToggle.rejected, (state, action) => {
            if (typeof (action.payload) === 'string') {
                state.error = action.payload;
            }
        });
        // get wishlist items
        builder.addCase(actGetWishList.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        });
        builder.addCase(actGetWishList.fulfilled, (state, action) => {
            state.loading = "succeeded";
            if (action.payload.dataType === "ProductsFullInfo") {
                state.productsFullInfo = action.payload.data as TProduct[];
            } else if (action.payload.dataType === "productsIds") {
                state.itemsId = action.payload.data as number[];
            }
        });
        builder.addCase(actGetWishList.rejected, (state, action) => {
            state.loading = "failed";
            if (typeof (action.payload) === 'string') {
                state.error = action.payload;
            }
        });

        // when logout reset
        builder.addCase(authLogout, (state) => {
            state.itemsId = [];
            state.productsFullInfo = [];
        });
    },
});

export { actLikeToggle, actGetWishList };
export const { cleanWishlistProductsFullInfo } = wishlistSlice.actions;
export default wishlistSlice.reducer;