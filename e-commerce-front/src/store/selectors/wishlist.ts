import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

const getWishlistTotalQuantitySelector = createSelector(
    // createSelector will listen if there any changes on cart items so if it exists it will execute this fn if not it will return the prev value which stored in it 
    (state: RootState) => state.wishlistSlice.itemsId
    ,
    (itemsId) => {
        const totalQuantity = Object.keys(itemsId).length
        return totalQuantity;
    }
)

export { getWishlistTotalQuantitySelector };
