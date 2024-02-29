import { TASKS_LIST } from "../constants/tasksListName";
import { addTaskInTasksList, removeTaskInMyDayList } from "../redux/slices/tasksSlice";
import { AppDispatch } from "../redux/store";
import { IDate, ITask } from "../redux/types";
import { getLocalDate } from "./getLocalDate";


export function moveTaskFromMyDayToTasks(taskList: ITask[], dispatch: AppDispatch): void {
    const today: IDate = {
        year: getLocalDate().today.year,
        month: getLocalDate().today.month,
        day: getLocalDate().today.day,
    }
    taskList.map(task => {
        if (JSON.stringify(today) !== JSON.stringify(task.createdDate)) {
            const updatedTask: ITask = {
                ...task,
                listName: TASKS_LIST,
                list: {
                    ...task.list,
                    isMyDayList: false,
                    isTasksList: true,
                }
            }
            dispatch(addTaskInTasksList(updatedTask));
            dispatch(removeTaskInMyDayList(task.id));
        }
    })
}
