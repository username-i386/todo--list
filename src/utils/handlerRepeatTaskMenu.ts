import { REPEAT_DAILY, REPEAT_MONTHLY, REPEAT_WEEKLY, REPEAT_YEARLY, REPEAT_WORK_DAY } from "../constants/createTaskMenuItemsVariant";
import { setRepeatToTask } from "../redux/slices/repeatTaskSlice";
import { AppDispatch } from "../redux/store";
import { IRepeatTask } from "../redux/types";
import { getLocalDate } from "./getLocalDate";


export function handlerToRepeatTaskMenu(variant: string, dispatch: AppDispatch) {
    switch (variant) {
        case REPEAT_DAILY:
            const dailyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_DAILY,
                nextDateRepeat: getLocalDate().getFutureDate(1),
            }
            dispatch(setRepeatToTask(dailyRepeatTask));
            break;
        case REPEAT_MONTHLY:
            const monthlyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_MONTHLY,
                nextDateRepeat: getLocalDate().getFutureDate(30),
            }
            dispatch(setRepeatToTask(monthlyRepeatTask));
            break;
        case REPEAT_WEEKLY:
            const weeklyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_WEEKLY,
                nextDateRepeat: getLocalDate().getFutureDate(7),
            }
            dispatch(setRepeatToTask(weeklyRepeatTask));
            break;
        case REPEAT_YEARLY:
            const yearlyRepeatTask: IRepeatTask = {
                isRepeat: true,
                repeatVariant: REPEAT_YEARLY,
                nextDateRepeat: getLocalDate().getFutureDate(365),
            }
            dispatch(setRepeatToTask(yearlyRepeatTask));
            break;
        case REPEAT_WORK_DAY:
            let nextWorkDay;
            for (let i = 1; i < 7; i++) {
                console.log(i);
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
            dispatch(setRepeatToTask(workDayRepeatTask));
            break;
    }
}