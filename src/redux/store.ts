import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slices/menuSlice";
import tasksReducer from "./slices/tasksSlice";
import planedTaskReducer from "./slices/planedTaskSlice";
import repeatTaskReducer from "./slices/repeatTaskSlice";
import taskMenuReducer from "./slices/taskMenuSlice";



export const store = configureStore({
   reducer: {
      menuSlice: menuReducer,
      tasksSLice: tasksReducer,
      planedTask: planedTaskReducer,
      repeatTask: repeatTaskReducer,
      taskMenu: taskMenuReducer,
   }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch