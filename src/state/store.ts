import {applyMiddleware, combineReducers, legacy_createStore, UnknownAction} from "redux"
import {thunk, ThunkDispatch} from "redux-thunk"
import {appReducer} from "./app-reducer";
import {productsReducer} from "./products-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    products: productsReducer
})

export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk))

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>

