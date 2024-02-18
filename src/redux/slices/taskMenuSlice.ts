import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ITaskMenuState } from "../types";



const initialState: ITaskMenuState = {
   isOpen: false,
   task: undefined,
}

const taskMenuSlice = createSlice({
   name: 'taskMenuSlice',
   initialState,
   reducers: {
      toggleTaskMenu: (state: ITaskMenuState, action: PayloadAction<ITaskMenuState>) => {
         state.isOpen = action.payload.isOpen;
         state.task = action.payload.task;
      },
   }
})

export const { toggleTaskMenu } = taskMenuSlice.actions;

export default taskMenuSlice.reducer;