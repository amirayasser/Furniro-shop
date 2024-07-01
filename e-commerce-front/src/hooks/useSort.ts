import { useEffect, useState } from "react";
import { useAppSelector } from "@store/hooks";

const useSort = (products, selectedOption) => {

    const [sortedProds, setSortedProds] = useState([]);

    useEffect(() => {
        const sortProducts = () => {
            const updatedProds = [...products];

            if (selectedOption === 2) {
                sortByPrice(updatedProds, true);
            } else if (selectedOption === 3) {
                sortByPrice(updatedProds, false);
            } else {
                setSortedProds(updatedProds);
            }
        };

        sortProducts();
    }, [selectedOption, products]);

    const sortByPrice = (prods, asc) => {
        prods.sort((a, b) => {
            const priceA = a.newPrice ?? a.price;
            const priceB = b.newPrice ?? b.price;
            return asc ? priceA - priceB : priceB - priceA;
        });
        setSortedProds([...prods]);
    };

    return sortedProds;
};

export default useSort;
