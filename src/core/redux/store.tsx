import { configureStore, Tuple } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { thunk } from "redux-thunk";



export const store = configureStore(
    {
        reducer: reducers,
        middleware: () => new Tuple(thunk)
    }
)

export type State = ReturnType<typeof reducers>