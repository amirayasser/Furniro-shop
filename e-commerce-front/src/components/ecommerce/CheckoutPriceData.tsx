import React from 'react'
import { Table } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";

const CheckoutPriceData = ({ urProds, totalprice }) => {

    return (
        <Table hover className='mt-5'>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
                {urProds.map((product) => (
                    <tr key={product.id}
                        style={{ border: 'none', outline: 'none' }}
                    >
                        <td style={{ border: 'none', outline: 'none' }}>
                            <span style={{ color: '#9F9F9F', fontSize: '0.9rem' }}>{product.title}</span> <RxCross2 /> {product.quantity}
                        </td>
                        <td
                            style={{ border: 'none', outline: 'none', textAlign: 'center' }}
                        >{product.newPrice?.toFixed(2) || product.price.toFixed(2)}</td>
                    </tr>
                ))}
                <tr
                    style={{ borderTop: '1px solid #dee2e6' }}
                >
                    <td>Total</td>
                    <td style={{ color: "#B88E2F" }}><strong>$ {totalprice.toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </Table>
    )
}

export default CheckoutPriceData;
