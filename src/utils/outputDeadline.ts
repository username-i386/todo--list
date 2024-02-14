import { IDate } from "../redux/types";
import { getLocalDate } from "./getLocalDate";


export function outputDeadline(planedTaskDate: IDate): string {
   if (planedTaskDate?.year === getLocalDate().today.year) {
      if (planedTaskDate?.month === getLocalDate().today.month) {
         if (planedTaskDate?.day === getLocalDate().today.day) {
            return 'Сегодня';
         } else if (planedTaskDate?.day === getLocalDate().today.day + 1) {
            return 'Завтра';
         }
      }
   }

   const date = new Date(planedTaskDate.year, planedTaskDate.month - 1, planedTaskDate.day);

   return 'Срок: ' +
      getLocalDate(date.getDay()).dayShortName() + ', ' +
      planedTaskDate.day + ' ' +
      getLocalDate(undefined, date.getMonth()).monthName();
}