import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPlanedTaskState, IDate } from "../types";



const initialState: IPlanedTaskState = {
   date: undefined
}

const planedTaskSlice = createSlice({
   name: 'planedTaskSlice',
   initialState,
   reducers: {
      setPlanedToTask: (state: IPlanedTaskState, action: PayloadAction<IDate | undefined>): void => {
         state.date = action.payload;
      },
   }
})

export const { setPlanedToTask } = planedTaskSlice.actions;

export default planedTaskSlice.reducer;