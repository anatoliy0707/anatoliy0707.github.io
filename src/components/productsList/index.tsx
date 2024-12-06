import {Space} from "antd";
import {ProductDomainType} from "../../state/products-reducer";
import {Product} from "../product";


type ProductListPropsType = {
    products: ProductDomainType[]
}

export const ProductsList = (props: ProductListPropsType) => {


    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Space
                direction="horizontal"
                size="middle"
                wrap
                style={{
                    justifyContent: "center",
                    flexGrow: 1,
                    padding: "20px",
                }}
            >
                {props.products?.map((product) => (
                    <Product key={product.id} {...product} />
                ))}
            </Space>
        </div>
    );
};
