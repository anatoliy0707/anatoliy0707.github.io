import {Dispatch} from "redux";
import {cardAPI, ProductType} from "../api/card-api";
import {RootState} from "./store";

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed"
export type ViewMode = "all" | "favorites"

export type AppReducerType = {
    viewMode: ViewMode,
    status: RequestStatus,
    error: string | null,
}

const initialState: AppReducerType = {
    viewMode: "all" as ViewMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
}

type InitialState = typeof initialState

export const appReducer = (state: InitialState = initialState, action: ActionsType): InitialState => {
    switch (action.type) {
        case "SET_VIEW_MODE":
            return {...state, viewMode: action.payload.mode}
        case "SET_APP_STATUS":
            return {...state, status: action.payload.status}
        default:
            return state
    }
}

// Action creators
export const setViewMode = (mode: ViewMode) => {
    return {
        type: "SET_VIEW_MODE",
        payload: {mode},
    } as const
}

export const setAppStatus = (status: RequestStatus) => {
    return {
        type: "SET_APP_STATUS",
        payload: {status},
    } as const
}

// selectors
export const selectViewMode = (state: RootState) => state.app?.viewMode
export const selectAppStatus = (state: RootState) => state.app?.status

// Actions types
type SetViewModeActionType = ReturnType<typeof setViewMode>
type SetAppStatusActionType = ReturnType<typeof setAppStatus>

type ActionsType = 
    | SetViewModeActionType
    | SetAppStatusActionType