import React, { useEffect } from "react";
import "./offcanvas.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate } from "react-router-dom";
import { BsBagX } from "react-icons/bs";
import Cart from "@pages/Cart";
import ProdCartTables from "./prodCartTables";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProdByCartItems } from "@store/cart/cartSlice";
import { RxCross2 } from "react-icons/rx";
import { OffcanvasHeader } from "react-bootstrap";

const OffCanvasCart = ({ toggleShow, handleClose, show }) => {
  const navigate = useNavigate();
  const { items, products, loading, error } = useAppSelector(
    (state) => state.cartSlice
  );
  const dispatch = useAppDispatch();

  const cartProducts = products.map((el) => ({
    ...el,
    quantity: items[el.id],
  }));

  useEffect(() => {
    dispatch(actGetProdByCartItems());
  }, [dispatch, items]);

  return (
   
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        scroll={true}
        backdrop={true}
        style={{
          height: "530px",
          width: "330px",
        }}
      >
        <Offcanvas.Header 
        // closeButton
        className="offchead"
        >
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
          <BsBagX
          onClick={handleClose}
          style={{cursor:'pointer'}}
          />
        </Offcanvas.Header>
        <Offcanvas.Body
        className="offcbody"
        >
            <main>
              {cartProducts.map(cp => <div className="cartSMProd" key={cp.id}>
              <img src={cp.img} alt={`pic ${cp.id}`}
              className="cartSMPic"
              />
              <p>{cp.title}</p>
                <span>{cp.quantity} <RxCross2 /> </span>
              <span>$ {cp.newPrice?.toFixed(2) || cp.price.toFixed(2)}</span>
              </div>)}
            </main>
        
        </Offcanvas.Body>
        <OffcanvasHeader>
        <div
          className="ccbtns"
        >
          <button onClick={() => navigate("/cart")}>Cart</button>
          <button onClick={() => navigate("/Checkout")}>Checkout</button>
        </div>  
        </OffcanvasHeader>
      </Offcanvas>
  );
};

export default OffCanvasCart;
