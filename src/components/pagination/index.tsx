import {Pagination} from "antd";
import {ProductDomainType} from "../../state/products-reducer";

type PaginationProps = {
    products: ProductDomainType[]
    currentPage: number
    itemsPerPage: number
    onChange: (page: number) => void;
}

export const CustomPagination = (props: PaginationProps) => {

    return <Pagination
        current={props.currentPage}
        total={props.products?.length || 0}
        pageSize={props.itemsPerPage}
        onChange={props.onChange}
        showSizeChanger={false}
    />
}