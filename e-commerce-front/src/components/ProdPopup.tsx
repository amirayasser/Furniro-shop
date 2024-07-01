import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actLikeToggle } from "@store/wishlist/wishlistSlice";
import { Spinner } from "react-bootstrap";
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";
import { MdVisibility } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductPopup({
  handleAddToCart,
  disableBtn,
  QuantityReachMax,
  max,
  handleViewProd,
  prodId,
}) {

  const navigate = useNavigate()

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.authSlice.user?.id);
  const {itemsId } = useAppSelector (state => state.wishlistSlice)

  const [isLiked , setIsLiked] = useState ()

  

  useEffect(() => {
    const likedItem = itemsId.find(item => item === prodId);
    setIsLiked(!!likedItem);
  }, [itemsId, prodId]);

  const likeToggleHandler = () => {
    if (prodId === undefined) {
      navigate('/*')
    } else {
      dispatch(actLikeToggle({ userId, productId: prodId }));
      setIsLiked(prev => !prev);
    }
  };


  return (
    <div className="prodPopup">
      <button
      
        className="addToCartBtn"
        onClick={handleAddToCart}
        disabled={disableBtn}
      >
        {!QuantityReachMax && disableBtn ? (
          <>
            <Spinner animation="border" size="sm" /> Loading...
          </>
        ) : QuantityReachMax ? (
          <p
            style={{
              cursor: "not-allowed",
              marginBottom: 0,
              textTransform: "capitalize",
            }}
          >
            you reach the limit
            <br />
            <span
              style={{
                color: "#000",
                fontSize: "11px",
              }}
            >
              you only can get{" "}
              <mark style={{ color: "#B88E2F", backgroundColor: "#fff" }}>
                {max}
              </mark>{" "}
              items.
            </span>{" "}
          </p>
        ) : (
          "Add to cart"
        )}
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          width: "90%",
          gap: "20px",
        }}
      >
        <button
          onClick={() => handleViewProd(prodId)} // Pass prodId to handleViewProd
          className="viewBtn"
        >
          <MdVisibility /> view
        </button>
        <button className="favBtn" onClick={likeToggleHandler}>
           {isLiked
            ?
            <>
            <GoHeartFill />
            Liked
            </>
            :
            <>
              <GoHeart/>
             Like
            </>
             }
        </button>
      </div>
    </div>
  );
}

export default ProductPopup;
