import { TProduct } from "@customTypes/product";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import actGetProdByCartItems from './thunk/actGetProdByCartItems';
import { TLoading } from "@customTypes/shared";
import { calcSubPrice, calcTotalPrice } from "@utils/priceCalculations";
import { useAppSelector } from "@store/hooks";



interface ICartState {
  currUserId?: number | null,
  items: { [key: string]: number };
  products: TProduct[];
  loading: TLoading;
  error: null | string;
  subprice: { [key: string]: number };
  totalprice: number;
}

const initialState: ICartState = {
  currUserId: null,
  products: [],
  items: {},
  loading: 'idle',
  error: null,
  subprice: {},
  totalprice: 0,

};



const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    addProd(state, action: PayloadAction<{ prodId: number; currUserId: number | undefined }>) {
      state.currUserId = action.payload.currUserId;

      const prodId = action.payload.prodId;

      if (state.items[prodId]) {
        state.items[prodId]++;
      } else {
        state.items[prodId] = 1;
      }
      state.subprice = calcSubPrice(state.products, state.items);
      state.totalprice = calcTotalPrice(state.subprice);
    },

    updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload;
      state.items[id] = quantity;
      state.subprice = calcSubPrice(state.products, state.items);
      state.totalprice = calcTotalPrice(state.subprice);
    },

    deleteProdFromCart(state, action) {
      const prodId = action.payload;
      if (state.items[prodId] > 1) {
        state.items[prodId] -= 1
      } else {
        delete state.items[prodId];
      }
      state.subprice = calcSubPrice(state.products, state.items);
      state.totalprice = calcTotalPrice(state.subprice);
    },


    resetCart(state, action: PayloadAction<{ userId: number }>) {
      console.log('Reset cart called');
      console.log('Current user ID:', state.currUserId);
      console.log('Payload user ID:', action.payload.userId);

      if (state.currUserId === action.payload.userId) {
        state.items = {};
        state.products = [];
        state.subprice = {};
        state.totalprice = 0;
        console.log('Cart reset successful');
      } else {
        console.log('User ID mismatch, cart not reset');
      }
    },

  },

  extraReducers: (builder) => {
    builder.addCase(actGetProdByCartItems.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    })
    builder.addCase(actGetProdByCartItems.fulfilled, (state, action) => {
      state.loading = 'succeeded';
      state.products = action.payload
      state.error = null;
      state.subprice = calcSubPrice(state.products, state.items);
      state.totalprice = calcTotalPrice(state.subprice);

    })
    builder.addCase(actGetProdByCartItems.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === 'string') {
        state.error = action.payload;
      }
    })
  }
});


export { actGetProdByCartItems };
export const { addProd, updateQuantity, deleteProdFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
