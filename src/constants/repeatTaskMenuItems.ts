import { BsCalendar3, BsCalendar3Week, BsCalendar2Range, BsCalendar4Event, BsCalendar4 } from "react-icons/bs";
import { ITaskMenuItem } from "../compomemts/types";
import { REPEAT_DAILY, REPEAT_WORK_DAY, REPEAT_WEEKLY, REPEAT_MONTHLY, REPEAT_YEARLY } from "./createTaskMenuItemsVariant";

export const REPEAT_TASK_MENU_ITEMS: ITaskMenuItem[] = [
    {
        icon: BsCalendar3,
        title: 'Ежедневно',
        dayShortName: '',
        variant: REPEAT_DAILY,
    },
    {
        icon: BsCalendar3Week,
        title: 'Рабочие дни',
        dayShortName: '',
        variant: REPEAT_WORK_DAY,
    },
    {
        icon: BsCalendar2Range,
        title: 'Еженедельно',
        dayShortName: '',
        variant: REPEAT_WEEKLY,
    },
    {
        icon: BsCalendar4Event,
        title: 'Ежемесячно',
        dayShortName: '',
        variant: REPEAT_MONTHLY,
    },
    {
        icon: BsCalendar4,
        title: 'Ежегодно',
        dayShortName: '',
        variant: REPEAT_YEARLY,
    },
]