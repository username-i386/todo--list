import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IRepeatTask, IRepeatTaskState } from "../types"


const initialState: IRepeatTaskState = {
   repeatTask: {
      isRepeat: false,
      nextDateRepeat: undefined,
      repeatVariant: '',
   }
}

const repeatTaskSlice = createSlice({
   name: 'repeatTaskSlice',
   initialState,
   reducers: {
      setRepeatToTask: (state: IRepeatTaskState, action: PayloadAction<IRepeatTask>): void => {
         state.repeatTask = action.payload;
      }
   }
})

export const { setRepeatToTask } = repeatTaskSlice.actions;

export default repeatTaskSlice.reducer;