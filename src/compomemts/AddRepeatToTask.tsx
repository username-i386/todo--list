import { Stack } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { IAddRepeatToTaskProps } from "./types";
import { RepeatTaskMenu } from "./RepeatTaskMenu";
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