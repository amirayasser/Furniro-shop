import PageHeader from '@components/common/layout/header/mainHeader/PageHeader'
import Product from '@components/ecommerce/product/Product'
import { useAppDispatch, useAppSelector } from '@store/hooks'
import { actGetWishList, actLikeToggle } from '@store/wishlist/wishlistSlice'
import  { useEffect } from 'react'
import {  Container } from 'react-bootstrap'
import { RiDislikeLine } from "react-icons/ri";
import { BsBox2Heart } from "react-icons/bs";

const WishList = () => {
    const dispatch = useAppDispatch()
    const {itemsId , productsFullInfo , loading , error} = useAppSelector(state => state.wishlistSlice )
    const user = useAppSelector(st => st.authSlice.user)
    
    useEffect(()=>{
        dispatch(actGetWishList("productsFullInfo"))
    },[dispatch])

    const handleDisLike = (productId) => {
        dispatch(actLikeToggle({ userId: user.id, productId }));
    }

    return (
    <div
    style={{width:'100%'}}
    className='wishlistPage'
    >
        <PageHeader prodName={'wishlist'} pageName={'Wish List'}/>

         <Container
         style={{
            display:'flex',
            flexWrap:'wrap',
            gap:'1%',
            marginTop:'40px'
         }}
         >

         {
            itemsId.length === 0 ?
            
            <p className='my-5 mx-auto fw-bold fs-5'>
                            Your wishlist is currently empty <BsBox2Heart style={{ width: '30px', height: '30px', marginLeft: '10px', color:'#f21f34'}}/>
                             <br />
                         <span className='fw-light fs-6 ms-5 text-secondary'>
                        
                            Start adding products you love!
                            </span>   
            </p>
            :
                <>
                

                {productsFullInfo.map(product => (
                   <>
                   <Product
                    prodPic={product.img}
                    prodTitle={product.title} 
                    prodDescrip ={product.description}
                    prodPrice = {product.price}
                    newProdPrice = {product?.newPrice}
                    
                    />
                        <RiDislikeLine className='disLikeBtn' onClick={() => handleDisLike(product.id)}/>
                    </>
                    
                ))}

                </>
                
                 }
        </Container>
            

    </div>
  )
}

export default WishList
