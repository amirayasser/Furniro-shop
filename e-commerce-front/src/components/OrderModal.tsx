import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const OrderModal = ({
  handleConfirmPlaceOrder,
  total,
  loading,
  error,
  handleShow,
  handleClose,
  show,
  
}) => {
  const handleMouseEnter = (e) => {
    e.target.style.backgroundColor = "#B88E2F"; // Change to your desired hover color
  };

  const handleMouseLeave = (e) => {
    e.target.style.backgroundColor = "#fff"; // Reset to original color
  };



  return (
    <>
      <Button
        onClick={handleShow}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          color: "#000",
          borderColor: "#B88E2F",
          backgroundColor: "#fff",
          padding: "10px 50px",
          borderRadius: "15px",
        }}
      >
        Place order
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>confirming process</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to place order that costs: $
          <strong>{total?.toFixed(2)}</strong>
          {!loading && error && (
            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmPlaceOrder}
            style={{ color: "#fff", background: "#B88E2F", border: "none" }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderModal;
