import React, {useEffect} from 'react';
import './App.css';
import {Button, Layout, Pagination, Space, Spin} from "antd";
import {Content, Footer, Header} from "antd/es/layout/layout";
import {useAppDispatch} from "./hooks/use-app-dispatch";
import {
    selectAppStatus,
    selectViewMode
} from "./state/app-reducer";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {ProductsList} from "./components/productsList";
import {Filter} from "./components/filter";
import {ProductPage} from "./pages/product-page";
import {FormPage} from "./pages/form-page";
import {useAppSelector} from "./hooks/use-app-selector";
import {CustomPagination} from "./components/pagination";
import {usePagination} from "./hooks/use-pagination";
import { fetchProducts, selectAllProducts, selectCurrentProduct, selectFavoritesProducts } from './state/products-reducer';


function App() {
// test
    const allProducts = useAppSelector(selectAllProducts);
    const currentProduct = useAppSelector(selectCurrentProduct)
    const favoriteProducts = useAppSelector(selectFavoritesProducts);
    const viewMode = useAppSelector(selectViewMode);
    const appStatus = useAppSelector(selectAppStatus)
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const products = viewMode === "all" ? allProducts : favoriteProducts;

    const {itemsPerPage, currentPage, viewProducts, handlePageChange} = usePagination({products})

    useEffect(() => {
        dispatch(fetchProducts())
    }, [])

    if (appStatus === "loading") {
        return <Spin/>
    }

    if (appStatus === "failed") {
        return <Navigate to={"/404"}/>
    }

    return (
        <Layout style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Header style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                {location.pathname === "/" && <Filter/>}
                {(location.pathname !== "/404" && location.pathname !== "/") &&
                    <Button type="primary" onClick={() => navigate("/")}>На главную</Button>}
                {location.pathname === "/" && <Button onClick={() => navigate("/create-product")}>Создать</Button>}
            </Header>

            <Content
                style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '20px',
                    overflow: "auto",
                }}
            >
                <Routes>
                    <Route path="/" element={<ProductsList products={viewProducts}/>}/>
                    <Route path="/products/:id" element={<ProductPage/>}/>
                    <Route path="/create-product" element={<FormPage productToEdit={currentProduct}/>}/>
                    <Route path="/404" element={<h1>Page Not Found</h1>}/>
                </Routes>
            </Content>

            <Footer style={{textAlign: "center", padding: "8px 16px"}}>
                {location.pathname === "/" &&
                    <CustomPagination products={products} itemsPerPage={itemsPerPage} currentPage={currentPage}
                                      onChange={handlePageChange}/>}
            </Footer>
        </Layout>

    );
}

export default App;
