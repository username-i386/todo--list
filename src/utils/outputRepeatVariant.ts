import { REPEAT_DAILY, REPEAT_WEEKLY, REPEAT_MONTHLY, REPEAT_YEARLY, REPEAT_WORK_DAY } from "../constants/createTaskMenuItemsVariant";


export function outputRepeatVariant(repeatVariant: string): string {
   switch (repeatVariant) {
      case REPEAT_DAILY: return 'Ежедневно';
      case REPEAT_WEEKLY: return 'Еженедельно';
      case REPEAT_MONTHLY: return 'Ежемесячно';
      case REPEAT_YEARLY: return 'Ежегодно';
      case REPEAT_WORK_DAY: return 'Рабочие дни';

      default: return '';
   }
}