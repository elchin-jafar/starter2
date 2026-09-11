import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./header/headerSlice";
import modalReducer from "./modal";

export const store = configureStore({
    reducer: {
        header: headerReducer,
        modal: modalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
