import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ISearchRequest, ISearchState, ITask } from "../types";


const initialState: ISearchState = {
    searchTaskList: []
}

const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        searchTask: (state: ISearchState, action: PayloadAction<ISearchRequest>): void => {
            const searchList: ITask[] = action.payload.tasksList.filter(task => {
                return task.title.toLowerCase().includes(action.payload.searchTitle);
            });
            state.searchTaskList = searchList;
        },
        deleteSearchList: (state: ISearchState): void => {
            state.searchTaskList = []
        },
    }
})

export const { searchTask, deleteSearchList } = searchSlice.actions;

export default searchSlice.reducer;