import {Dispatch} from "redux";
import {cardAPI, ProductType} from "../api/card-api";
import {RootState} from "./store";
import { setAppStatus } from "./app-reducer";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type ViewMode = "all" | "favorites"
export type ProductDomainType = ProductType & {
    isLiked: boolean
}
export type ProductsReducerType = {
    products: ProductDomainType[]
    currentProductId: number | null,
}

const initialState: ProductsReducerType = {
    products: [] as ProductDomainType[],
    currentProductId: null,
}

type InitialState = typeof initialState

export const productsReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "SET_PRODUCTS":
            return {...state, products: action.payload.products.map(product => ({...product, isLiked: false}))}
        case "CHANGE_PRODUCT_LIKE":
            return {
                ...state,
                products: state.products.map((product) => (action.payload.id === product.id ? {
                    ...product,
                    isLiked: action.payload.like
                } : product))
            }
        case "REMOVE_PRODUCT":
            return {...state, products: state.products.filter(product => product.id !== action.payload.id)}
        case "SET_CURRENT_PRODUCT":
            return {...state, currentProductId: action.payload.id}
        case "CREATE_PRODUCT":
            return {...state, products: [{...action.payload.product, isLiked: false}, ...state.products]}
        case "UPDATE_PRODUCT":
            return {
                ...state, 
                products: state.products.map((product) => (action.payload.updatedProduct.id === product.id 
                ? {...action.payload.updatedProduct} 
                : product)),
                currentProductId: null
            }
        default:
            return state
    }
}

// Action creators
export const setProducts = (products: ProductType[]) => {
    return {
        type: "SET_PRODUCTS",
        payload: {products},
    } as const
}

export const changeProductLike = (id: number, like: boolean) => {
    return {
        type: "CHANGE_PRODUCT_LIKE",
        payload: {id, like},
    } as const
}

export const removeProduct = (id: number) => {
    return {
        type: "REMOVE_PRODUCT",
        payload: {id},
    } as const
}

export const setCurrentProduct = (id: number | null) => {
    return {
        type: "SET_CURRENT_PRODUCT",
        payload: {id},
    } as const
}

export const createProduct = (product: ProductType) => {
    return {
        type: "CREATE_PRODUCT",
        payload: {product},
    } as const
}

export const updateProduct = (updatedProduct: ProductDomainType) => {
    return {
        type: "UPDATE_PRODUCT",
        payload: {updatedProduct},
    } as const
}

// Thunks
export const fetchProducts = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatus("loading"));
        const res = await cardAPI.getAllProducts();
        dispatch(setAppStatus("succeeded"));
        dispatch(setProducts(res.data));
    } catch (error) {
        dispatch(setAppStatus("failed"));
    } finally {
        dispatch(setAppStatus("idle"));
    }
};

// selectors
export const selectAllProducts = (state: RootState) => state.products?.products
export const selectFavoritesProducts = (state: RootState) => state.products?.products.filter(product => product.isLiked)
export const selectCurrentProduct = (state: RootState) => state.products?.products.find(product => product.id === state.products?.currentProductId)

// Actions types
type SetProductsActionType = ReturnType<typeof setProducts>
type ChangeProductLikeActionType = ReturnType<typeof changeProductLike>
type RemoveProductActionType = ReturnType<typeof removeProduct>
type SetCurrentProductActionType = ReturnType<typeof setCurrentProduct>
type CreateProductActionType = ReturnType<typeof createProduct>
type updateProductActionType = ReturnType<typeof updateProduct>

type ActionsType = SetProductsActionType
    | ChangeProductLikeActionType
    | RemoveProductActionType
    | SetCurrentProductActionType
    | CreateProductActionType
    | updateProductActionType