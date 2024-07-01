import { TProduct } from '@customTypes/product';
import { deleteProdFromCart } from '@store/cart/cartSlice';
import { useAppDispatch } from '@store/hooks';
import { useEffect } from 'react';
import { FormControl, Table } from 'react-bootstrap';
import { MdDelete } from 'react-icons/md';
import Product from '../product/Product';

const ProdCartTables = ({ cartProducts, handleProdQuantity, subprice  }) => {
 
//   useEffect(()=>{
// const totalCartPrice = cartProducts.reduce((total, product)=>{
//     const initialQuantity = product.quantity || 1;
//     const prodTPrice = initialQuantity * parseFloat(product.newPrice || product.price);
//     return total + prodTPrice;
// },0)
// updateTotalCartPrice(totalCartPrice);
//   },[cartProducts, updateTotalCartPrice])

    const dispatch = useAppDispatch()
    const handleDeleteProd = (id)=>{
        dispatch(deleteProdFromCart(id))
    }

    return (
      <Table className="prodsTable">
          <thead>
              <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              {cartProducts.map((product: TProduct, index: number) => {
                  
                  return (
                      <tr key={index}>
                          <td
                              style={{
                                  color: "#616161",
                              }}
                          >
                              <img
                                  src={product.img}
                                  alt="prod-pic"
                                  style={{
                                      width: "60px",
                                      height: "60px",
                                      objectFit: "cover",
                                      marginRight: "20px",
                                      borderRadius: "6px",
                                  }}
                              />
                              {product.title}
                          </td>
                          <td style={{ color: "#bcbcbc" }}>
                              {product.newPrice ?? product.price}
                          </td>

                          <td>
                              <FormControl
                                  type="number"
                                  name="prodQuantity"
                                  min={1}
                                  max={product.max}
                                  value={product.quantity}
                                  onChange={(e) =>
                                      handleProdQuantity(product.id, parseInt(e.target.value))
                                  }
                                  style={{
                                      maxWidth: "70px",
                                      width: "50px",
                                      marginInline: "auto",
                                  }}
                              />
                          </td>
                          <td>
                            {subprice[product.id].toFixed(2)}
                            </td>
                          <td>
                              <MdDelete
                                  style={{
                                      color: "#B88E2F",
                                      fontSize: "1.5rem",
                                  }}
                                  onClick={()=>handleDeleteProd(product.id)}
                              />
                          </td>
                      </tr>
                  );
              })}
          </tbody>
      </Table>
  )
}

export default ProdCartTables
