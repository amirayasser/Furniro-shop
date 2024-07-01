import { TProduct } from "@customTypes/product";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Col,
  Container,
  FormControl,
  Row,
  Table,
} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { actGetProdByCartItems, updateQuantity } from "@store/cart/cartSlice";
import ProdCartTables from "@components/ecommerce/cart/prodCartTables";
import PageHeader from "@components/common/layout/header/mainHeader/PageHeader";
import useOrder from "@hooks/useOrder";
import Order from "@components/ecommerce/ShowOrderModal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, products, subprice, totalprice } = useAppSelector(
    (state) => state.cartSlice
  );

  const user = useAppSelector(st => st.authSlice.user)
  
  const dispatch = useAppDispatch();
  
  const cartProducts = products.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));


  useEffect(() => {
    if(user?.id){
      dispatch(actGetProdByCartItems());
    } 
  }, [dispatch, items , user?.id]);

  const handleProdQuantity = (prodId: number, newQuantity: number) => {
    dispatch(updateQuantity({ id: prodId, quantity: newQuantity }));
  };

  const navigate = useNavigate();

  return (
    <div className="cart">
      <PageHeader pageName="Cart" />

      <ProdCartTables
        cartProducts={cartProducts}
        subprice={subprice}
        handleProdQuantity={handleProdQuantity}
      />

      <div className="totalCartPrice">
        <h3>Cart Totals</h3>
        <Row>
          <Col>Subtotal</Col>
          <Col>
            {" "}
            {cartProducts.map((prod) => {
              const subPrice = subprice[prod.id] || 0;
              return <Row key={prod.id}>${subPrice.toFixed(2)}</Row>;
            })}
          </Col>
        </Row>
        <Row>
          <Col>Total</Col>
          <Col className="cartTPrice">$ {totalprice.toFixed(2)}</Col>
        </Row>
        <button className="checkout" onClick={() => navigate("/checkout")}>
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
