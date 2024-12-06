import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://fakestoreapi.com/',
})

// api
export const cardAPI = {
    getAllProducts() {
        return instance.get<Array<ProductType>>('products')
    },
}

// types
export type ProductType = {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    rating: { rate: number, count: number }
}