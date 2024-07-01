import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actGetProdByCatPrefix } from "@store/products/prodByCPrefixSlice";

const useFilter = (prodsFullInfo, searchResults, fullProdsLoadState) => {
  const dispatch = useAppDispatch();
  const categFilteredProds = useAppSelector(
    (state) => state.prodByCPrefixSlice.records
  );

  const [filteredProds, setFilteredProds] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedOption, setSelectedOption] = useState(1);

  useEffect(() => {
    const filterProducts = async () => {
      if (!prodsFullInfo.length || fullProdsLoadState === "pending") {
        return; // Return early if products are not fully loaded
      }

      if (selectedCategory === "all") {
        setFilteredProds(
          searchResults?.length > 0 ? [...searchResults] : [...prodsFullInfo]
        );
      } else {
        let filteredByCategory = [];

        if (searchResults?.length > 0) {
          // Filter search results by category
          filteredByCategory = searchResults.filter((product) =>
            categFilteredProds.some(
              (categProd) => categProd.title === product.title
            )
          );
        } else {
          // Filter all products by category
          filteredByCategory = categFilteredProds.filter(
            (categProd) => categProd.cat_prefix === selectedCategory
          );
        }

        setFilteredProds(filteredByCategory);
      }
    };

    // Call filterProducts function
    filterProducts();
  }, [categFilteredProds, searchResults, selectedCategory, fullProdsLoadState]);

  const handleFilter = async (category) => {
    setSelectedCategory(category); // Update selectedCategory state

    // Dispatch action to get products by category prefix
    if (category !== "all") {
      await dispatch(actGetProdByCatPrefix(category));
    }
  };

  // Return conditional rendering based on existence of filteredProds
  const noProductsMessage = "There are no products matching your criteria.";

  return {
    filteredProds,
    handleFilter,
    selectedOption,
    setSelectedOption,
    selectedCategory,
    setSelectedCategory,
    noProductsMessage,
  };
};

export default useFilter;
