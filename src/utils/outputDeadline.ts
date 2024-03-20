import { IDate } from "../redux/types";
import { isExpiredDate } from "./checkIsExpiredDate";
import { getLocalDate } from "./getLocalDate";


export function outputDate(planedTaskDate: IDate, isCreatedDate: boolean): string {

   const today: IDate = getLocalDate().today;

   if (planedTaskDate?.year === today.year) {
      if (planedTaskDate?.month === today.month) {
         if (planedTaskDate?.day === today.day) {
            return 'Сегодня';
         } else if (planedTaskDate?.day === getLocalDate().today.day + 1) {
            return 'Завтра';
         }
      }
   }

   
   const date = new Date(planedTaskDate.year, planedTaskDate.month - 1, planedTaskDate.day);

   const outputDate = getLocalDate(date.getDay()).dayShortName() + ', ' +
                     planedTaskDate.day + ' ' +
                     getLocalDate(undefined, date.getMonth()).monthName();

   if (isCreatedDate) {
      return 'Создано: ' + outputDate;
   } else if (isExpiredDate(planedTaskDate)) {
      return 'Просрочено, ' + outputDate;
   } else {
      return 'Срок: ' + outputDate;
   }
}

