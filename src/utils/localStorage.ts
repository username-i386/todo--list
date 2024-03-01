import { IMenuSliceState, INoteState, ISubtaskState, ITaskMenuState, ITasksState } from "../redux/types";


export function setTaskListsToLocalStorage(taskLists: ITasksState): void {
    localStorage.setItem('taskLists', JSON.stringify(taskLists));
}

export function setSubtasksToLocalStorage(subtask: ISubtaskState): void {
    localStorage.setItem('subtask', JSON.stringify(subtask));
}

export function setNotesToLocalStorage(notes: INoteState): void {
    localStorage.setItem('notes', JSON.stringify(notes));
}

export function setNavbarToLocalStorage(navBar: IMenuSliceState): void {
    localStorage.setItem('navBar', JSON.stringify(navBar));
}

export function setTaskMenuToLocalStorage(taskMenu: ITaskMenuState): void {
    localStorage.setItem('taskMenu', JSON.stringify(taskMenu));
}