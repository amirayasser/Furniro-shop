import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
    persistStore, persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import categories from "./categories/categoriesSlice";
import products from "./products/productSlice";
import allProducts from "./products/allProdsSlice";
import cartSlice from "./cart/cartSlice";
import productSlice from "./products/productSlice";
import authSlice from "./auth/authSlice";
import prodByCPrefixSlice from "./products/prodByCPrefixSlice";
import wishlistSlice from "./wishlist/wishlistSlice";
import orderSlice from "./orders/orderSlice";
import checkoutSlice from "./checkout/checkoutSlice";

const rootPresistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartSlice', 'authSlice', 'orderSlice']  // i want to cash cart so i put it in white list
}

const authPresistConfig = {
    key: 'auth',
    storage,
    whitelist: ['accessToken', 'user']
}

const cartPresistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items', 'currUserId']  // i want to cash cart so i put it in white list
}

const orderPresistConfig = {
    key: 'orders',
    storage,
    whitelist: ['orderList']
}

const checkoutPresistConfig = {
    key: 'checkout',
    storage,
    whitelist: ['billingData']
}

const rootReducer = combineReducers({
    authSlice: persistReducer(authPresistConfig, authSlice),
    categories,
    productSlice,
    allProducts,
    prodByCPrefixSlice,
    cartSlice: persistReducer(cartPresistConfig, cartSlice),
    wishlistSlice,
    orderSlice: persistReducer(orderPresistConfig, orderSlice),
    checkoutSlice: persistReducer(checkoutPresistConfig, checkoutSlice)
})

const persistedReducer = persistReducer(rootPresistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => (
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
    )

});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;


const persistor = persistStore(store);

export { store, persistor };