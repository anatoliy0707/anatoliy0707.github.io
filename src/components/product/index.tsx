import React from "react";
import {Card, Image, Typography} from "antd";
import {
    DeleteOutlined,
    LikeOutlined, LikeTwoTone, EditOutlined
} from "@ant-design/icons";
import {useAppDispatch} from "../../hooks/use-app-dispatch";
import {useNavigate} from "react-router-dom";
import { changeProductLike, ProductDomainType, removeProduct, setCurrentProduct } from "../../state/products-reducer";

const {Text} = Typography;

export type ProductPropsType = ProductDomainType

export const Product = ({
                            id,
                            title,
                            price,
                            category,
                            description,
                            image,
                            rating,
                            isLiked
                        }: ProductPropsType) => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleActionClick = (e: React.MouseEvent, action: "delete" | "likeEnabled" | "likeDisabled" | "edit") => {
        e.stopPropagation();
        if (action === "delete") {
            dispatch(removeProduct(id))
        }
        if (action === "edit") {
            navigate(`/create-product`)
            dispatch(setCurrentProduct(id))
        }
        const like = action === "likeEnabled"
        dispatch(changeProductLike(id, like))
    };

    const likeRender = (isLiked: boolean) => {
        return isLiked
            ? <LikeTwoTone key="likeDisabled" onClick={(e) => {
                handleActionClick(e, "likeDisabled")
            }}/>
            : <LikeOutlined key="likeEnabled" onClick={(e) => {
                handleActionClick(e, "likeEnabled")
            }}/>
    }

    const actions: React.ReactNode[] = [
        <DeleteOutlined key="delete" onClick={(e) => {
            handleActionClick(e, "delete")
        }}/>,
        <EditOutlined key="edit" onClick={(e) => {
            handleActionClick(e, "edit")
        }} />,
        likeRender(isLiked)
    ];

    return <Card
        hoverable
        title={title}
        bordered={false}
        style={{width: 300}}
        actions={actions}
        onClick={() => {
            navigate(`/products/${id}`)
            dispatch(setCurrentProduct(id))
        }}>
        <p>Цена - {price} $</p>
        <h4>{category}</h4>
        <p><Text ellipsis>{description}</Text></p>
        <Image src={!!image ? image: "https://ap.auezov.edu.kz/images/news/aaa001.png"} style={{width: 100, height: 100, objectFit: "contain"}} alt={"нет изображения"} preview={false}/>
        <p>Остаток - {rating.count}</p>
    </Card>
}