import React, { useEffect, useState } from "react";
import { Button, Container, FormControl } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProdById } from "@store/products/productSlice";
import { TProduct } from "@customTypes/product";
import ProdPicsBox from "@components/ecommerce/prod pics box/ProdPicsBox";
import PageHeader from "@components/common/layout/header/mainHeader/PageHeader";
import { addProd, updateQuantity } from "@store/cart/cartSlice";
import Product from "@components/ecommerce/product/Product";
import actGetProdByCatPrefix from "@store/products/act/getProductsByCPerfixThunk";
import RelatedProds from "@components/ecommerce/Related Products/RelatedProds";

const SingleProduct = () => {
  const {id}  = useParams<{ id: number }>();
  const dispatch = useAppDispatch();
  const { records, loading, error } = useAppSelector(
    (state) => state.productSlice
  );

  const items = useAppSelector((state) => state.cartSlice.items);

  useEffect(() => {
    dispatch(actGetProdById(id));
  }, [dispatch, id]);

  // const [product] = records || [];
  const product = records ? records[0] : null;


  const [quantity, setQuantity] = useState(product?.id ? items[product.id.toString()] || 0 : 0);

  const handleProdQuantity = (prodId: number, newQuantity: number) => {
    dispatch(updateQuantity({ id: prodId, quantity: newQuantity }));
    setQuantity(newQuantity);
  };

  const handleAddToCart = ()=>{
    dispatch(addProd(product.id))
    setQuantity(prev => prev+1); // Reset quantity to 1 after adding to cart
  }

  

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!records) {
    return <div>Product not found</div>;
  }


  return (
    <div className="singleProd">
      <PageHeader
        prodName={product?.title}
        bgstyle={{
          background: "#F9F1E7",
          justifyContent: "center",
          alignItems:'start',
          height: "100px",
          paddingLeft: "100px",
        }}
      />
      <Container>
        <main>
          <ProdPicsBox pics={product?.img} />

          <div className="prodInfo" >

            <h2>{product?.title}</h2>

            <h4
              style={{ color: "#9F9F9F", fontSize: "24px", fontWeight: "500" }}
            >
              $ {product?.newPrice?.toFixed(2)}
            </h4>
            <h4>
              $ {product?.price.toFixed(2)}
            </h4>

            <p 
              className="prodDescrip"
            >{product?.description}</p>

            <p
              className="prodCategory"
            >Category :<span>{product?.cat_prefix}</span></p>

            <div
            className='prodSize'
            >
              <p>Size</p>
              <button>
                L
              </button>
              <button>
                XL
              </button>
              <button>
                XS
              </button>
            </div>

            <div className='prodColor'>
              <p>Color</p>
              <div></div>
              <div></div>
              <div></div>
            </div>

            <FormControl
              type="number"
              max={product?.max}
              value={quantity || 0}
              onChange={(e) =>
                handleProdQuantity(product?.id, parseInt(e.target.value))
              }
              className="quantity"
            />
            <Button
            onClick={handleAddToCart}
            disabled= {quantity === product?.max}
            style={{
              // backgroundColor: '#fff', border: '3px solid #B88E2F', color:'#B88E2F'
            }}
            >Add To Cart</Button>
          </div>
        </main>
      </Container>

        <hr
        style={{ color: '#9F9F9F', width: '100%', height: '2px', backgroundColor:'#9F9F9F' }}
        ></hr>

        <RelatedProds product={product}/> 
        
    </div>
  );
};

export default SingleProduct;
