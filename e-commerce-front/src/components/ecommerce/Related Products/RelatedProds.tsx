import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProdByCatPrefix } from "@store/products/prodByCPrefixSlice";
import  { useEffect } from "react";
import Product from "../product/Product";
import { Container } from "react-bootstrap";

const RelatedProds = ({ product }) => {
  const dispatch = useAppDispatch();
  const allRelatedProds = useAppSelector(
    (state) => state.prodByCPrefixSlice.records
  );
  useEffect(() => {
    dispatch(actGetProdByCatPrefix(product?.cat_prefix));
  }, [product]);


  let sliceLastNo = 4;
  const relProdsToDisplay = allRelatedProds
    .filter((relprod) => relprod.id !== product?.id)
    .slice(0, 4);


  return (
    <Container
      style={{
        margin: '40px 0px',
      }}
    >
      <h3
        style={{ textAlign: 'center', fontSize: '36px', fontWeight: '600', marginBottom: '30px', }}
      >
        Related Products
      </h3>
      <div
        style={{ display: "flex", gap: "32px", justifyContent: "space-between" }}
      >
        {relProdsToDisplay.map((relprod, index) => (
          <Product
            key={index}
            prodPic={relprod.img}
            prodTitle={relprod.title}
            prodPrice={relprod.price}
            newProdPrice={relprod.newPrice}
            prodDescrip={relprod.description}
          />
        ))}
      </div>
    </Container>
  );
};

export default RelatedProds;
