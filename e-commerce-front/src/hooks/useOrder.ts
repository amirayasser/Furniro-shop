import { useAppDispatch, useAppSelector } from '@store/hooks';
import actPlaceOrder from '@store/orders/act/actPlaceOrder';
import OrderModal from '@components/OrderModal';
import { useState } from 'react';
import { resetCart } from '@store/cart/cartSlice';

const useOrder = (checkSubmitForm, changeSubmittingFormState) => {
    const dispatch = useAppDispatch();
    const { orderList, loading, error } = useAppSelector(state => state.orderSlice)
    const { subprice, totalprice, items, products } = useAppSelector(state => state.cartSlice)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log('checkSubmitForm:', checkSubmitForm);


    const handleConfirmDispatchOrder = async () => {
        if (checkSubmitForm) {
            const result = await dispatch(actPlaceOrder(totalprice));
            if (actPlaceOrder.fulfilled.match(result)) {
                changeSubmittingFormState(false);
                const lastOrder = result.payload; // Access the payload directly
                console.log('Dispatching resetCart with userId:', lastOrder.userId);
                dispatch(resetCart({ userId: lastOrder.userId }));
            } else {
                console.error('Order placement failed:', result.error.message);
            }
        } else {
            alert('You are not filling the billing form, please do it to place the order');
        }
    };

    return {
        orderList,
        loading,
        error,
        totalprice,
        handleConfirmDispatchOrder,
        show,
        handleShow,
        handleClose
    };
}



export default useOrder
