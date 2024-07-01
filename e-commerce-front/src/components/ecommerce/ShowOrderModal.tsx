import OrderModal from '@components/OrderModal';
import useOrder from '@hooks/useOrder';

const ShowOrderModal = ({ checkSubmitForm, changeSubmittingFormState }) => {
    const { loading, error, totalprice, handleConfirmDispatchOrder, show, handleClose, handleShow } = useOrder(checkSubmitForm, changeSubmittingFormState);

    console.log(checkSubmitForm)

    return (
        
        <OrderModal
        handleShow={handleShow}
        handleClose={handleClose}
        show={show}
            handleConfirmPlaceOrder={handleConfirmDispatchOrder} // Pass formData to handleConfirm
            total={totalprice}
            loading={loading}
            error={error}
        />
    );
}

export default ShowOrderModal;
