import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import tasksReducer from "./slices/tasksSlice";
import planedTaskReducer from "./slices/planedTask";


export const store = configureStore({
   reducer: {
      menuSlice: menuReducer,
      tasksSLice: tasksReducer,
      planedTask: planedTaskReducer,
   }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch