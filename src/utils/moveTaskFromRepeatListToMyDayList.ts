import { addTaskInMyDayList, removeTaskInRepeatList } from "../redux/slices/tasksSlice";
import { AppDispatch } from "../redux/store";
import { IDate, ITask } from "../redux/types";
import { changeRepeatToTask } from "./changeRepeatToTask";
import { getLocalDate } from "./getLocalDate";


export function moveTaskFromRepeatListToMyDayList(repeatList: ITask[], dispatch: AppDispatch) {
    repeatList.map(task => {
        const repeatDate: IDate = {
            year: task.repeat.nextDateRepeat?.year || 0,
            month: task.repeat.nextDateRepeat?.month || 0,
            day: task.repeat.nextDateRepeat?.day || 0,
        }
        const today: IDate = {
            year: getLocalDate().today.year,
            month: getLocalDate().today.month,
            day: getLocalDate().today.day,
        }

        if (JSON.stringify(repeatDate) === JSON.stringify(today)) {
            const updatedTask: ITask = {
                ...task,
                createdDate: today,
                list: {
                    ...task.list,
                    isAllList: true,
                    isMyDayList: true,
                }
            }
            changeRepeatToTask(task.repeat.repeatVariant, dispatch, updatedTask);
            dispatch(removeTaskInRepeatList(task.id));
        } 
    })
}