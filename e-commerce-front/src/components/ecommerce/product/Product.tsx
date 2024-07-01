import React, { memo, useEffect, useState } from "react";

import styles from "./prod.module.css";
import { Figure } from "react-bootstrap";
import ProdBadge from "@components/ProdBadge";
import ProductPopup from "@components/ProdPopup";

import prod1 from "@assets/image 1.png";
import prod2 from "@assets/image 2.png";
import prod3 from "@assets/image 3.png";
import prod4 from "@assets/image 4.png";
import prod5 from "@assets/image 5.png";
import prod6 from "@assets/image 6.png";
import prod7 from "@assets/image 7.png";
import prod8 from "@assets/image 8.png";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { addProd } from "@store/cart/cartSlice";
import LazyLoadedImage from "../LazyLoadedImage";
import { useNavigate } from "react-router-dom";


const {
  figureHovered,
  figure,
  figureimg,
  prodDetails,
  prodName,
  prodDiscrip,
  newPrice,
  oldPrice,
  prodBadge,
} = styles;

// const prodsImgs = [prod1, prod2, prod3, prod4, prod5, prod6, prod7, prod8];

const Product = memo(({
  index,
  prodPic,
  prodTitle,
  prodDescrip,
  prodPrice,
  newProdPrice,
  product,
  prodId,
  max,
  quantity
}) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(st => st.authSlice.user)
  const navigate = useNavigate()

  const handleAddToCart = () => {
    if (prodId === undefined) {
      navigate('/*')
    } else {
      dispatch(addProd({ prodId: prodId, currUserId: user?.id }));
      setBtnIsDisabled(true);
    }
  };

  const [hoveredProductIndex, setHoveredProductIndex] = useState(0);

  const handleMouseoverProd = (index: number) => {
    setHoveredProductIndex(index);
  };

  const handleMouseLeaveProd = () => {
    setHoveredProductIndex(0);
  };


  const currRemainQuantity = max - (quantity ?? 0)

  const quantityReachedTMax = currRemainQuantity <= 0 ? true : false


  const [isBtnDisabled, setBtnIsDisabled] = useState(false);



  useEffect(() => {
    if (quantityReachedTMax) {
      setBtnIsDisabled(true)
    }
    if (!isBtnDisabled) {
      return;
    }
    const debounce = setTimeout(() => {
      setBtnIsDisabled(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);


  const handleViewProd = () => {
    if (prodId === undefined) {
      navigate('/*')
    }else {
      navigate(`/products/${prodId}`);
    }
    
  }

  return (
    <Figure
      className={hoveredProductIndex === index + 1 ? figureHovered : figure}
      onMouseMove={() => handleMouseoverProd(index + 1)}
      onMouseLeave={handleMouseLeaveProd}
    >
      <LazyLoadedImage
        alt="prod pic"
        src={prodPic}
        className={figureimg}
      />
      <Figure.Caption className={prodDetails}>
        <h3 className={prodName}>{prodTitle}</h3>
        {
          prodDescrip &&
          <p className={prodDiscrip}>{prodDescrip?.slice(0, 50)}...</p>
        }


        {newProdPrice !== undefined && typeof newProdPrice === 'number' ? (
          <>
            <h4 className={newPrice}>{newProdPrice.toFixed(2)}</h4>
            <p className={oldPrice}>{prodPrice !== undefined && typeof prodPrice === 'number' ? prodPrice.toFixed(2) : ''}</p>
          </>
        ) : (
          <h4 className={newPrice}>{prodPrice !== undefined && typeof prodPrice === 'number' ? prodPrice.toFixed(2) : ''}</h4>
        )}

      </Figure.Caption>

      {hoveredProductIndex === index + 1 && (
        <ProductPopup handleAddToCart={handleAddToCart} disableBtn={isBtnDisabled} QuantityReachMax={quantityReachedTMax} max={max} handleViewProd={handleViewProd} prodId={prodId} />
      )}

      <ProdBadge
        content={
          newProdPrice
            ? `${Math.ceil(((prodPrice - newProdPrice) / prodPrice) * 100)}% `
            : "New"
        }
        classN={prodBadge}
      />
    </Figure>
  )
})

export default Product;

