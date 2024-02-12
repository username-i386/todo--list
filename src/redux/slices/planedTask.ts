import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPlanedTaskState, IPlanedTaskDate } from "../types";



const initialState: IPlanedTaskState = {
   date: undefined
}

const planedTaskSlice = createSlice({
   name: 'planedTaskSlice',
   initialState,
   reducers: {
      setPlanedToTask: (state: IPlanedTaskState, action: PayloadAction<IPlanedTaskDate | undefined>): void => {
         state.date = action.payload;
      },
   }
})

export const { setPlanedToTask } = planedTaskSlice.actions;

export default planedTaskSlice.reducer;