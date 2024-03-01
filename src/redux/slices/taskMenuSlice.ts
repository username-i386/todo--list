import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ITaskMenuState } from "../types";



const defaultState: ITaskMenuState = {
   isOpen: false,
   task: undefined,
}

const initialState = (): ITaskMenuState => {
   if (localStorage.getItem('taskMenu')) {
      return JSON.parse(localStorage.taskMenu);
   } else {
      return defaultState;
   }
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