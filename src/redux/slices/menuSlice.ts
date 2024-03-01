import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMenuSliceState } from "../types";


const defaultState: IMenuSliceState = {
   isMenuOpen: true,
}

const initialState = (): IMenuSliceState => {
   if (localStorage.getItem('navBar')) {
      return JSON.parse(localStorage.navBar);
   } else {
      return defaultState;
   }
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