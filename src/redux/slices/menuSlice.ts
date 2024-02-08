import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMenuSliceState } from "../types";


const initialState: IMenuSliceState = {
   isMenuOpen: true,
}
const menuSlice = createSlice({
   name: 'menuSlice',
   initialState,
   reducers: {
      toggleMenu: (state: IMenuSliceState, action: PayloadAction<boolean>) => {
         state.isMenuOpen = action.payload
      },
   }
})

export const { toggleMenu } = menuSlice.actions;

export default menuSlice.reducer