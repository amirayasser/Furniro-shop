import ProdsSlider from "@components/ecommerce/productsCarousel/prodsSlider";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetAllProds } from "@store/products/allProdsSlice";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "@styles/globalStyle.css";
import PageHeader from "@components/common/layout/header/mainHeader/PageHeader";
import headerimg from "@assets/pexels-gabby-k-6373839.jpg";
import FilterProds from "@components/ecommerce/filter products/FilterProds";
import useFilter from "@hooks/useFilter";
import useSort from "@hooks/useSort";
import usePagination from "@hooks/usePagination";
import { actSearchForProdByTitle } from "@store/products/productSlice";
import { FiXCircle } from "react-icons/fi";
import useProducts from "@hooks/useProducts";

const Shop = () => {
  const dispatch = useAppDispatch();
  // const { records: prodsFullInfo, loading } = useAppSelector(state => state.allProducts);
  const { prodsFullInfo, loading } = useProducts();

  const searchResults = useAppSelector(state => state.productSlice.records);

  const { filteredProds, handleFilter, selectedOption, setSelectedOption, selectedCategory, setSelectedCategory, noProductsMessage } = useFilter(prodsFullInfo, searchResults, loading);
  const sortedProds = useSort(filteredProds, selectedOption);

  const [pageNo, setPageNo] = useState(1);
  const { currentPage, totalPages, handlePageChange, beginSlideShownProds, endSlideShownProds, shownProdsInLastPage } = usePagination(sortedProds, 12, setPageNo);

  const [isSearchResults, setIsSearchResults] = useState(false);

  useEffect(() => {
    dispatch(actGetAllProds());
  }, [dispatch]);

  useEffect(() => {
    setIsSearchResults(searchResults.length > 0);
  }, [searchResults]);

  const handleOptionChange = (e) => {
    setSelectedOption(Number(e.target.value));
  };

  const endSearch = () => {
    dispatch(actSearchForProdByTitle(""));
    setSelectedCategory('all');
    setIsSearchResults(false);
  };

  const {
    currentPage: searchPage,
    totalPages: searchTotalPages,
    handlePageChange: handleSearchPageChange,
  } = usePagination(sortedProds, 12, setPageNo);

  const currentPageToUse = isSearchResults ? searchPage : currentPage;
  const totalPagesToUse = isSearchResults ? searchTotalPages : totalPages;
  const handlePageChangeToUse = isSearchResults ? handleSearchPageChange : handlePageChange;

  const beginSlideShownProdsToUse = (currentPageToUse - 1) * 12 + 1;
  const endSlideShownProdsToUse = Math.min(currentPageToUse * 12, sortedProds.length);
  const shownProdsInLastPageToUse = currentPageToUse === totalPagesToUse ? sortedProds.length % 12 || 12 : 12;



  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "30px",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 0",
        width: "100%",
      }}
      className="shopPage"
    >
      <PageHeader
        bgPic={headerimg}
        bgstyle={{ backgroundPosition: "50% 53.5%" }}
        pageName={"Shop"}
      />

      <FilterProds
        onOptionChange={handleOptionChange}
        optionValue={selectedOption}
        handleFilter={handleFilter}
        allSelectedProdsNum={filteredProds?.length || 0}
        toNum={endSlideShownProdsToUse}
        fromNum={beginSlideShownProdsToUse}
        prodsPerSlide={shownProdsInLastPageToUse}
      />

      {isSearchResults && (
        <Button className="endsearchbtn" onClick={endSearch} variant="danger">
          cancel search <FiXCircle />
        </Button>
      )}

      {isSearchResults && searchResults?.length === 0 &&
        <div>There are no products matching this search.</div>
      }

      { loading ==='succeeded' && filteredProds.length === 0 && (
        <div>{noProductsMessage}</div>
      )}

      <ProdsSlider
        allProds={sortedProds}
        setPageNums={setPageNo}
        pageNo={totalPagesToUse}
        currentPage={currentPageToUse}
        onCurrentPageChange={handlePageChangeToUse}
        itemsPerPage={12}
        loadingStatus={loading}
      />

    </div>
  );
};

export default Shop;
