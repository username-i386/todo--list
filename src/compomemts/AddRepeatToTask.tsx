import { Icon, Stack, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { IAddRepeatToTaskProps } from "./types";
import { RepeatTaskMenu } from "./RepeatTaskMenu";
import { ThunkDispatch, UnknownAction, Dispatch } from "@reduxjs/toolkit";
import { IMenuSliceState, ITasksState, IPlanedTaskState, IRepeatTaskState, ITaskMenuState, ISubtaskState } from "../redux/types";
import { handlerToRepeatTaskMenu } from "../utils/handlerRepeatTaskMenu";
import { BsCalendar3, BsCalendar3Week, BsCalendar2Range, BsCalendar4Event, BsCalendar4 } from "react-icons/bs";
import { REPEAT_DAILY, REPEAT_WORK_DAY, REPEAT_WEEKLY, REPEAT_MONTHLY, REPEAT_YEARLY } from "../constants/createTaskMenuItemsVariant";
import { REPEAT_TASK_MENU_ITEMS } from "../constants/repeatTaskMenuItems";
import { changeRepeatToTask } from "../utils/changeRepeatToTask";


export const AddRepeatToTask: FC<IAddRepeatToTaskProps> = ({ task }): ReactElement => {

    
    return (
        
        <Stack direction={'row'} align={'center'} cursor={'pointer'}>
            <RepeatTaskMenu taskMenuItems={REPEAT_TASK_MENU_ITEMS} 
                handlerMenuItem={changeRepeatToTask} 
                task={task} 
                isNewTask={false} />
        </Stack>
    )
}