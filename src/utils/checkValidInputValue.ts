import { IDate } from "../redux/types";
import { getLocalDate } from "./getLocalDate";

const NEXT_YEAR: string = 'NEXT_YEAR';
const CURRENT_YEAR: string = 'CURRENT_YEAR';
const LAST_YEAR: string = 'LAST_YEAR';

const NEXT_MONTH: string = 'NEXT_MONTH';
const CURRENT_MONTH: string = 'CURRENT_MONTH';
const LAST_MONTH: string = 'LAST_MONTH';


export function checkValidInputValue(planedDate: IDate | undefined): boolean {
    if (!planedDate) return false;
    
    const today: IDate = getLocalDate().today;
    
    const planedYear: string = checkWhatYearItIsNow(planedDate, today);
    const planedMonth: string = checkWhatMonthItIsNow(planedDate, today);
    
    if (planedYear === NEXT_YEAR) {
        if (checkMonthValid(planedDate)) {
            return checkDayValid(planedDate, 1, 31);
        } else {
            return false;
        }
    } else if (planedYear === CURRENT_YEAR) {
        if (planedMonth === CURRENT_MONTH) {
            return checkDayValid(planedDate, today.day, 31);
        } else if (planedMonth === NEXT_MONTH) {
            return checkDayValid(planedDate, 1, 31);
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function checkWhatYearItIsNow(planedDate: IDate, today: IDate): string {
    if (planedDate.year > today.year) {
        return NEXT_YEAR;
    } else if (planedDate.year < today.year) {
        return LAST_YEAR;
    } else if (planedDate.year === today.year) {
        return CURRENT_YEAR;
    }
    
    return '';
}

function checkWhatMonthItIsNow(planedDate: IDate, today: IDate): string {
    if (planedDate.month > today.month) {
        return NEXT_MONTH;
    } else if (planedDate.month < today.month) {
        return LAST_MONTH;
    } else if (planedDate.month === today.month) {
        return CURRENT_MONTH;
    }
    
    return '';
}

function checkMonthValid(planedDate: IDate): boolean {
    if (0 < planedDate.month && planedDate.month <= 12) {
        return true;
    } else {
        return false;
    }
}

function checkDayValid(planedDate: IDate, minLimit: number, maxLimit: number): boolean {
    if (minLimit <= planedDate.day && planedDate.day <= maxLimit) {
        return true;
    } else {
        return false;
    }
}