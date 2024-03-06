import { REPEAT_DAILY, REPEAT_MONTHLY, REPEAT_WEEKLY, REPEAT_YEARLY, REPEAT_WORK_DAY } from "../constants/createTaskMenuItemsVariant";
import { AppDispatch } from "../redux/store";
import { IRepeatTask, ITask } from "../redux/types";
import { addTaskToList } from "./addTaskToList";
import { deleteTaskToList } from "./deleteTaskToList";
import { getLocalDate } from "./getLocalDate";

const updatedTask = (task: ITask, updatedRepeat: IRepeatTask): ITask => {
    return {
        ...task,
        repeat: updatedRepeat,
    }
}

export function changeRepeatToTask(variant: string, dispatch: AppDispatch, task?: ITask) {
    if (!task) return;
    switch (variant) {
        case REPEAT_DAILY:
            const dailyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_DAILY,
                nextDateRepeat: getLocalDate().getFutureDate(1),
            }
            
            deleteTaskToList(task, dispatch);
            addTaskToList(updatedTask(task, dailyRepeatTask), dispatch);
            break;
        case REPEAT_MONTHLY:
            const monthlyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_MONTHLY,
                nextDateRepeat: getLocalDate().getFutureDate(30),
            }

            deleteTaskToList(task, dispatch);
            addTaskToList(updatedTask(task, monthlyRepeatTask), dispatch);
            break;
        case REPEAT_WEEKLY:
            const weeklyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_WEEKLY,
                nextDateRepeat: getLocalDate().getFutureDate(7),
            }
            
            deleteTaskToList(task, dispatch);
            addTaskToList(updatedTask(task, weeklyRepeatTask), dispatch);
            break;
        case REPEAT_YEARLY:
            const yearlyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_YEARLY,
                nextDateRepeat: getLocalDate().getFutureDate(365),
            }
            
            deleteTaskToList(task, dispatch);
            addTaskToList(updatedTask(task, yearlyRepeatTask), dispatch);
            break;
        case REPEAT_WORK_DAY:
            let nextWorkDay;
            for (let i = 1; i < 7; i++) {
                if (getLocalDate().isWorkDayTomorrow(i)) {
                    nextWorkDay = getLocalDate().getFutureDate(i);
                    break;
                }
            }
            const workDayRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_WORK_DAY,
                nextDateRepeat: nextWorkDay,
            }
            
            deleteTaskToList(task, dispatch);
            addTaskToList(updatedTask(task, workDayRepeatTask), dispatch);
            break;
    }
}