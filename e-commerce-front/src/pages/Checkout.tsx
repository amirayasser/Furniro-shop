import PageHeader from "@components/common/layout/header/mainHeader/PageHeader";
import CheckoutPriceData from "@components/ecommerce/CheckoutPriceData";
import ShowOrderModal from "@components/ecommerce/ShowOrderModal";
import CheckoutForm from "@components/forms/CheckoutForm/CheckoutForm";
import { TBillsData } from "@customTypes/checkout";
import useOrder from "@hooks/useOrder";
import { useAppSelector } from "@store/hooks";
import { useState } from "react";
import { Container } from "react-bootstrap";


const Checkout = () => {
  const { orderList, totalprice } = useOrder();
  const { subprice, products, items } = useAppSelector(
    (state) => state.cartSlice
  );

  const urProds = products.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  const [isSubmitting, setIsSubmitting] = useState(false); // State to control form submission

  console.log(isSubmitting)

  return (
    <div className="checkoutPage">
      <PageHeader pageName={"Checkout"} />
      <Container className="d-flex gap-5 align-items-start py-5 mt-4">
        <CheckoutForm isSubmitting={isSubmitting} setIsSubmitting={setIsSubmitting}/>

        <div
          className="CheckoutPriceData"
          style={{
            width: "40%",
            padding: "0 30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CheckoutPriceData urProds={urProds} totalprice={totalprice} />

          <ul style={{ color: "#9F9F9F" }}>
            <li>
              <h5 style={{ color: "#000", fontSize: "1rem" }}>
                Direct Bank Transfer
              </h5>
              <p style={{ fontWeight: "300", fontSize: "0.9rem" }}>
                Make your payment directly into our bank account. Please use
                your Order ID as the payment reference. Your order will not be
                shipped until the funds have cleared in our account.
              </p>
            </li>
            <li>Direct Bank Transfer</li>
            <li>Cash On Delivery</li>
          </ul>
          <p
            style={{
              fontWeight: "300",
              fontSize: "0.9rem",
              marginBottom: "30px",
            }}
          >
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <strong>privacy policy</strong>.
          </p>

          <ShowOrderModal checkSubmitForm={isSubmitting} changeSubmittingFormState={setIsSubmitting} />
        
        </div>
      </Container>
    </div>
  );
};

export default Checkout;
