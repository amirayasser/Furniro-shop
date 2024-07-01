import React from 'react'
import styles from './cartIcon.module.css';
import Logo from '../../../assets/svgs/cart.svg?react';
import { useAppSelector } from '@store/hooks';
import { getCartTotalQuantitySelector } from '@store/selectors';
import { useEffect, useState } from 'react';
import OffCanvasCart from './OffCanvasCart';

const { pumpCartQuantity, basketQuantity, basketContainer } = styles;

const CartIcon = () => {

  const [isAnimate, setIsAnimate] = useState(false)

  const totalQuantity = useAppSelector(getCartTotalQuantitySelector)

  useEffect(()=>{
    if(!totalQuantity){
      return;  // prevent animation if total quantity is zero
    }
    setIsAnimate(true)
    const debounce = setTimeout(() => {
      setIsAnimate(false)
    }, 300);
   
    return () => clearTimeout(debounce)
  },[totalQuantity])
  
  const [openOffCanvas, setOpenOffCanvas] = useState(false)
  const handleOpenOffCanvasCart = ()=>{
    setOpenOffCanvas(true)
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);


  return (
    <>
  
    <div className={basketContainer}
       onClick = { toggleShow }
    >
      <Logo title='cart icon' />
      <div className={`${basketQuantity}   ${isAnimate ? pumpCartQuantity : ''} `}>{totalQuantity}</div>
    </div>
    <OffCanvasCart handleClose={handleClose} toggleShow={toggleShow} show={show}/>
    </>
  )  
}

export default CartIcon
