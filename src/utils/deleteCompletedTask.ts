import { removeTaskInCompletedList } from "../redux/slices/tasksSlice";
import { AppDispatch } from "../redux/store";
import { IDate, ITask } from "../redux/types";
import { getLocalDate } from "./getLocalDate";


export function deleteCompletedTask(taskList: ITask[], dispatch: AppDispatch): void {
    const today: IDate = {
        year: getLocalDate().today.year,
        month: getLocalDate().today.month,
        day: getLocalDate().today.day,
    }
    taskList.map(task => {
        if (JSON.stringify(today) !== JSON.stringify(task.createdDate)) {
            dispatch(removeTaskInCompletedList(task.id));
        }
    })
}