import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { INoteState, INote } from "../types";


const initialState: INoteState = {
    notes: []
}

const notesSlice = createSlice({
    name: 'notesSlice',
    initialState,
    reducers: {
        addNote: (state: INoteState, action: PayloadAction<INote>): void => {
            state.notes.push(action.payload);
        },
        deleteNote: (state: INoteState, action: PayloadAction<INote>): void => {
            state.notes = state.notes.filter(note => note.taskId !== action.payload.taskId);
        }
    },
})

export const { addNote, deleteNote } = notesSlice.actions;

export default notesSlice.reducer;