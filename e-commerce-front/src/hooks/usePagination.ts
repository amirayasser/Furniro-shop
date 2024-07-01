import { useEffect, useState } from "react";

const usePagination = (sortedProds, itemsPerPage, setPageNo) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(sortedProds.length / itemsPerPage);

    useEffect(() => {
        setPageNo(totalPages); 
        setCurrentPage(1); // Reset to first page when items change

    }, [totalPages, setPageNo, itemsPerPage]);


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const beginSlideShownProds = (currentPage - 1) * itemsPerPage + 1;
    const endSlideShownProds = Math.min(currentPage * itemsPerPage, sortedProds.length);
    const shownProdsInLastPage = currentPage === totalPages ? (sortedProds.length % itemsPerPage) || itemsPerPage : itemsPerPage;

    return { currentPage, totalPages, handlePageChange, beginSlideShownProds, endSlideShownProds, shownProdsInLastPage };
};


export default usePagination;
