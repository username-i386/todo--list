import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITask, ITasksState } from "../types";


const initialState: ITasksState = {
   myDayList: [
      {
         id: '0',
         title: 'taskTitletaskTitletaskTitletaskTitletaskTitle',
         listName: 'MY_DAY_LIST',
         isComplete: false,
         repeat: {
            isRepeat: false,
            nextDateRepeat: undefined,
            repeatVariant: '',
         },
         isImportant: false,
         planedDate: {
            year: 0,
            month: 0,
            day: 0,
         },
         createdDate: {
            year: 0,
            month: 0,
            day: 0,
         },
         list: {
            isAllList: true,
            isTasksList: false,
            isMyDayList: true,
            isPlanedList: false,
            isCompletedList: false,
            isImportantList: false,
            isRepeatList: false,
         },
      },
      {
         id: '1',
         title: '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
         listName: 'MY_DAY_LIST',
         isComplete: false,
         repeat: {
            isRepeat: false,
            nextDateRepeat: undefined,
            repeatVariant: '',
         },
         isImportant: false,
         planedDate: {
            year: 0,
            month: 0,
            day: 0,
         },
         createdDate: {
            year: 0,
            month: 0,
            day: 0,
         },
         list: {
            isAllList: true,
            isTasksList: false,
            isMyDayList: true,
            isPlanedList: false,
            isCompletedList: false,
            isImportantList: false,
            isRepeatList: false,
         },
      },
      {
         id: '2',
         title: '==-056596304563045693056=079=67657',
         listName: 'MY_DAY_LIST',
         isComplete: false,
         repeat: {
            isRepeat: false,
            nextDateRepeat: undefined,
            repeatVariant: '',
         }, 
         isImportant: false,
         planedDate: {
            year: 0,
            month: 0,
            day: 0,
         },
         createdDate: {
            year: 0,
            month: 0,
            day: 0,
         },
         list: {
            isAllList: true,
            isTasksList: false,
            isMyDayList: true,
            isPlanedList: false,
            isCompletedList: false,
            isImportantList: false,
            isRepeatList: false,
         },
      },
   ],
   importantList: [],
   planedList: [],
   allList: [],
   completedList: [],
   tasksList: [],
   repeatList: [],
}

const tasksSlice = createSlice({
   name: 'tasksSlice',
   initialState,
   reducers: {
      addTaskInMyDayList: (state: ITasksState, action: PayloadAction<ITask>): void => {
         state.myDayList.push(action.payload);
      },
      addTaskInImportantList: (state: ITasksState, action: PayloadAction<ITask>): void => {
         state.importantList.push(action.payload);
      },
      addTaskInPlanedList: (state: ITasksState, action: PayloadAction<ITask>): void => {
         state.planedList.push(action.payload);
      },
      addTaskInAllList: (state: ITasksState, action: PayloadAction<ITask>): void => {
         state.allList.push(action.payload);
      },
      addTaskInCompletedList: (state: ITasksState, action: PayloadAction<ITask>): void => {
         state.completedList.push(action.payload);
      },
      addTaskInTasksList: (state: ITasksState, action: PayloadAction<ITask>): void => {
         state.tasksList.push(action.payload);
      },
      addTaskInRepeatList: (state: ITasksState, action: PayloadAction<ITask>): void => {
         state.repeatList.push(action.payload);
      },
      removeTaskInMyDayList: (state: ITasksState, action: PayloadAction<string>) => {
         state.myDayList = state.myDayList.filter(task => task.id !== action.payload)
      },
      removeTaskInImportantList: (state: ITasksState, action: PayloadAction<string>) => {
         state.importantList = state.importantList.filter(task => task.id !== action.payload)
      },
      removeTaskInPlanedList: (state: ITasksState, action: PayloadAction<string>) => {
         state.planedList = state.planedList.filter(task => task.id !== action.payload)
      },
      removeTaskInAllList: (state: ITasksState, action: PayloadAction<string>) => {
         state.allList = state.allList.filter(task => task.id !== action.payload)
      },
      removeTaskInCompletedList: (state: ITasksState, action: PayloadAction<string>) => {
         state.completedList = state.completedList.filter(task => task.id !== action.payload)
      },
      removeTaskInTasksList: (state: ITasksState, action: PayloadAction<string>) => {
         state.tasksList = state.tasksList.filter(task => task.id !== action.payload)
      },
      removeTaskInRepeatList: (state: ITasksState, action: PayloadAction<string>) => {
         state.repeatList = state.repeatList.filter(task => task.id !== action.payload)
      },
   }
})

export const { 
   addTaskInAllList,
   addTaskInImportantList,
   addTaskInCompletedList,
   addTaskInMyDayList,
   addTaskInPlanedList,
   addTaskInTasksList,
   addTaskInRepeatList,
   removeTaskInAllList,
   removeTaskInImportantList,
   removeTaskInCompletedList,
   removeTaskInMyDayList,
   removeTaskInPlanedList,
   removeTaskInTasksList, 
   removeTaskInRepeatList,
} = tasksSlice.actions;

export default tasksSlice.reducer;