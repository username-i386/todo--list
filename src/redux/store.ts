import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import tasksReducer from "./slices/tasksSlice";
import planedTaskReducer from "./slices/planedTask";
import repeatTaskReducer from "./slices/repeatTask";


export const store = configureStore({
   reducer: {
      menuSlice: menuReducer,
      tasksSLice: tasksReducer,
      planedTask: planedTaskReducer,
      repeatTask: repeatTaskReducer,
   }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch