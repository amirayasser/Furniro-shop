import React, { useEffect, useState } from 'react'
import { GrFavorite } from 'react-icons/gr'
import styles from '../../common/layout/header/mainHeader/mainHeader.module.css';
import { useAppSelector } from '@store/hooks';
import { getWishlistTotalQuantitySelector } from '@store/selectors/wishlist';
import style from '../cart/cartIcon.module.css';
import { Navigate, useNavigate } from 'react-router-dom';


const {  basketQuantity, pumpCartQuantity, basketContainer } = style;
const { icon } = styles;

const WishlistIcon = () => {

    const navigate = useNavigate()

    const [isAnimate, setIsAnimate] = useState(false)

    const totalQuantity = useAppSelector(getWishlistTotalQuantitySelector)
    useEffect(() => {
        if (!totalQuantity) {
            return;  // prevent animation if total quantity is zero
        }
        setIsAnimate(true)
        const debounce = setTimeout(() => {
            setIsAnimate(false)
        }, 300);

        return () => clearTimeout(debounce)
    }, [totalQuantity])
  return (
      <div className={basketContainer}>

          <div className={`${basketQuantity}   ${isAnimate ? pumpCartQuantity : ''} `}
              style={{ backgroundColor:'#F44F5A', right:'11px'}}
          >{totalQuantity}</div>
          <GrFavorite className={`mx-2 ${icon} me-4`} 
              onClick={() => navigate( "/wishlist:userId" )}
          />
    </div>
  )
}

export default WishlistIcon
