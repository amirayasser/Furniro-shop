import React, { useEffect, useState } from "react";
import Product from "../product/Product";
import { Button, Container, Spinner } from "react-bootstrap";


const ProdsSlider = ({ allProds, setPageNums, pageNo, currentPage, onCurrentPageChange, itemsPerPage , loadingStatus}) => {
 
  
  useEffect(()=>{
    setPageNums(Math.ceil(allProds.length / 12))
    
  }, [allProds.length, itemsPerPage, setPageNums]);


  const calcCurrPageSlice = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return allProds.slice(start, end);
  };


  const handleCurrPage = (no) => {
    if (no === "next") {
      onCurrentPageChange(Math.min(currentPage + 1, pageNo));
    }
    else if (no === "prev") {
      onCurrentPageChange(Math.max(currentPage - 1, 1));
    }
    else {
      onCurrentPageChange(no);
    }   
  };

  const btns = [];

  for (let no = 0; no < pageNo; no++) {
    btns.push(
      <Button
        onClick={() => handleCurrPage(no + 1)}
        style={{
          backgroundColor: currentPage === no + 1 ? "#B88E2F" : "#F9F1E7",
          color: currentPage === no + 1 ? "#fff" : "#000",
          border: "none",
        }}
        key={no}
      >
        {no + 1}
      </Button>
    );

  }
    btns.push(
      <Button
        onClick={() => handleCurrPage('next') }
        style={{
          backgroundColor: "#F9F1E7",
          color: "#000",
          borderColor:'#B88E2F',
          cursor: currentPage !== pageNo ? "pointer" : "not-allowed",
        }}
        disabled={currentPage === pageNo}
        key="next"
      >
        Next
      </Button>
    )
  btns.unshift(
    <Button
      onClick={() => handleCurrPage("prev")}
      style={{
        backgroundColor: "#F9F1E7",
        color: "#000",
        borderColor: "#B88E2F",
        cursor: currentPage !== 1 ? "pointer" : "not-allowed",
      }}
      disabled={currentPage === 1}
      key="prev"
    >
      Prev
    </Button>
  );
  
  return (
    <>
      <Container
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "stretch",
        }}
      >

        {
          loadingStatus === 'succeeded' 
        ? 
        calcCurrPageSlice().map((record, index) => (
          <Product
            key={record.id}
            index={index}
            prodPic={record.img}
            prodDescrip={record.description}
            prodPrice={record.price}
            newProdPrice={record.newPrice}
            prodTitle={record.title}
            prodId={record.id}
            product={record}
            max={record.max}
            quantity={record.quantity}
          />
        ))
      : <div className="d-flex gap-3 align-items-center mx-auto my-5 text-center">
              loading is {loadingStatus} <Spinner animation="border" role="status" variant="secondary" />
        </div>
      }
      </Container>

      <div
      style={{display:'flex', gap:'8px'}}
      >{btns}</div>
    </>
  );
};

export default ProdsSlider;
