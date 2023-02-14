import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";

import { AppThunk, RootState } from "./types";

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

//export const useDispatch = () => dispatchHook<Dispatch<any>>();
export const useDispatch = () => dispatchHook<AppThunk>();
