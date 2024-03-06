import { addTaskInRepeatList, 
    removeTaskInAllList, 
    removeTaskInCompletedList, 
    removeTaskInImportantList, 
    removeTaskInMyDayList, 
    removeTaskInPlanedList, 
    removeTaskInRepeatList, 
    removeTaskInTasksList } from "../redux/slices/tasksSlice";
import { AppDispatch } from "../redux/store";
import { ITask } from "../redux/types";
import { checkIsTaskInList } from "./checkIsTaskInList";


export function deleteTaskToList(task: ITask, dispatch: AppDispatch, taskList?: ITask[]) {
    if (task.repeat.isRepeat) {
        const repeatList: ITask[] = taskList ? taskList : [];
        if (!checkIsTaskInList(repeatList, task)) {
            dispatch(addTaskInRepeatList(task));
        }
    }

    if (task.list.isAllList) {
        dispatch(removeTaskInAllList(task.id));
    }

    if (task.list.isCompletedList) {
        dispatch(removeTaskInCompletedList(task.id));
    }

    if (task.list.isImportantList) {
        dispatch(removeTaskInImportantList(task.id));
    }

    if (task.list.isMyDayList) {
        dispatch(removeTaskInMyDayList(task.id));
    }

    if (task.list.isPlanedList) {
        dispatch(removeTaskInPlanedList(task.id));
    }

    if (task.list.isTasksList) {
        dispatch(removeTaskInTasksList(task.id));
    }
}