import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";

const getCartTotalQuantitySelector = createSelector(
    // createSelector will listen if there any changes on cart items so if it exists it will execute this fn if not it will return the prev value which stored in it 
    (state: RootState) => state.cartSlice.items
    ,
    (items) => {
        const totalQuantity = Object.values(items).reduce((acc, curr) => {
            return acc + curr;
        }, 0);
        return totalQuantity;
    }
)

export {getCartTotalQuantitySelector} ;
