import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { ISubtaskState, ISubtask } from "../types";


const defaultState: ISubtaskState = {
    subtasks: []
}

const initialState = (): ISubtaskState => {
    if (localStorage.getItem('subtask')) {
        return JSON.parse(localStorage.subtask);
    } else {
        return defaultState;
    }
}

const subtasksSlice = createSlice({
    name: 'subtasksSlice',
    initialState,
    reducers: {
        setSubtask: (state: ISubtaskState, action: PayloadAction<ISubtask>): void => {
            state.subtasks.push(action.payload);
        },
        deleteSubtask: (state:ISubtaskState, action: PayloadAction<string>): void => {
            state.subtasks = state.subtasks.filter(subtask => subtask.subtaskId !== action.payload)
        },
        toggleCompleteSubTask: (state: ISubtaskState, action: PayloadAction<string>): void => {
            state.subtasks.map(subtask => {
                if (subtask.subtaskId === action.payload) {
                    subtask.isComplete = !subtask.isComplete;
                }
            })
        },
    }
})

export const { setSubtask, deleteSubtask, toggleCompleteSubTask } = subtasksSlice.actions;

export default subtasksSlice.reducer;