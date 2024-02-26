import { addTaskInAllList, addTaskInCompletedList, addTaskInImportantList, addTaskInMyDayList, addTaskInPlanedList, addTaskInTasksList, addTaskInRepeatList } from "../redux/slices/tasksSlice";
import { AppDispatch } from "../redux/store";
import { ITask } from "../redux/types";


export function addTaskToList(task: ITask, dispatch: AppDispatch) {
    if (task.list.isAllList) {
        dispatch(addTaskInAllList(task));
    }

    if (task.list.isCompletedList) {
        dispatch(addTaskInCompletedList(task));
    }

    if (task.list.isImportantList) {
        dispatch(addTaskInImportantList(task));
    }

    if (task.list.isMyDayList) {
        dispatch(addTaskInMyDayList(task));
    }

    if (task.list.isPlanedList) {
        dispatch(addTaskInPlanedList(task));
    }

    if (task.list.isTasksList) {
        dispatch(addTaskInTasksList(task));
    }

    if (task.list.isRepeatList) {
        dispatch(addTaskInRepeatList(task));
    }
}