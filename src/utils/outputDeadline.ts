import { IPlanedTaskDate } from "../redux/types";
import { getLocalDate } from "./getLocalDate";


export function outputDeadline(planedTaskDate: IPlanedTaskDate): string {
   if (planedTaskDate?.year === getLocalDate().year) {
      if (planedTaskDate?.month === getLocalDate().month) {
         if (planedTaskDate?.day === getLocalDate().day) {
            return 'сегодня';
         } else if (planedTaskDate?.day === getLocalDate().day + 1) {
            return 'завтра';
         }
      }
   }

   const date = new Date(planedTaskDate.year, planedTaskDate.month - 1, planedTaskDate.day);

   return 'Срок: ' +
      getLocalDate(date.getDay()).dayShortName() + ', ' +
      planedTaskDate.day + ' ' +
      getLocalDate(undefined, date.getMonth()).monthName();
}