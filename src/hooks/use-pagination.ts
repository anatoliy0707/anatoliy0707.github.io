import {useState} from "react";
import {ProductDomainType} from "../state/products-reducer";

type UsePaginationProps = {
    products: ProductDomainType[];
}

export const usePagination = (props: UsePaginationProps) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const viewProducts = props.products?.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return {
        currentPage,
        itemsPerPage,
        viewProducts,
        handlePageChange
    }
}