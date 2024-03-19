import { IDate } from "../redux/types";
import { getLocalDate } from "./getLocalDate";

export function isExpiredDate(planedTaskDate: IDate): boolean {
    const today: IDate = getLocalDate().today;

    if (planedTaskDate.year < today.year) {
        return true;
    } else if (planedTaskDate.year === today.year) {
        if (planedTaskDate.month < today.month) {
            return true;
        } else if (planedTaskDate.month === today.month) {
            if (planedTaskDate.day < today.day) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}