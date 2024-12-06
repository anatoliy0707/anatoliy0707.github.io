import { Card, Image, Rate, Space, Typography } from "antd";
import React from "react";
import { useAppSelector } from "../../hooks/use-app-selector";
import { selectCurrentProduct } from "../../state/products-reducer";

const { Text } = Typography;

export const ProductPage = () => {
    const currentProduct = useAppSelector(selectCurrentProduct);

    return (
        <Space
            direction="horizontal"
            size="middle"
            wrap
            style={{
                justifyContent: "center",
                width: "100%",
                padding: "20px",
            }}
        >
            <Card
                title={currentProduct?.title}
                bordered={false}
                style={{
                    width: "100%",
                    maxWidth: "1200px",
                    margin: "0 auto",
                }}
            >
                <p>Цена - {currentProduct?.price} $</p>
                <h4>{currentProduct?.category}</h4>
                <p>
                    <Text>{currentProduct?.description}</Text>
                </p>
                <Image src={!!currentProduct?.image ? currentProduct.image : "https://ap.auezov.edu.kz/images/news/aaa001.png"} preview={false} />
                <p>Остаток - {currentProduct?.rating.count}</p>
            </Card>
        </Space>
    );
};
