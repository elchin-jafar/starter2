import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ActionType, ModalSliceType } from "./modal_slice.type";

const initialState: ModalSliceType = {
    users: {
        create: false,
        edit: false,
        delete: false,
    },
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setUsersModal: (
            state,
            action: PayloadAction<{
                type: Exclude<ActionType, "view">;
                value: boolean;
            }>,
        ) => {
            const { type, value } = action.payload;
            state.users[type] = value;
        },
    },
});

export const { setUsersModal } = modalSlice.actions;

export default modalSlice.reducer;
