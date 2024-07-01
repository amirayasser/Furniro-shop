import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetAllProds } from "@store/products/allProdsSlice";

const useProducts = () => {
    const dispatch = useAppDispatch();
    const { records , loading } = useAppSelector(state => state.allProducts);
    const cartItems = useAppSelector(state => state.cartSlice.items);

    useEffect(() => {
        dispatch(actGetAllProds());
    }, [dispatch]);

    const prodsFullInfo = records.map(el => ({
        ...el,
        quantity: cartItems[el.id] || 0,
    }));


   

    return {prodsFullInfo , loading};
};

export default useProducts;
