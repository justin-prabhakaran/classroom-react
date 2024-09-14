import { configureStore, Tuple } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { thunk } from "redux-thunk";



export const store = configureStore(
    {
        reducer: reducers,
        middleware: (getMiddleware) => getMiddleware() 
    }
)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;