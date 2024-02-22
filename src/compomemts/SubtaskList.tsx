import { Stack } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { CreateSubtask } from "./CreateSubtask";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { SubtaskListItem } from "./SubtaskListItem";


export const SubtaskList: FC = (): ReactElement => {

    const task = useSelector((state: RootState) => state.taskMenu.task);
    const allSubtasks = useSelector((state: RootState) => state.subtasks.subtasks);    

    console.log(allSubtasks);
    
    return (
        <Stack pl={4}>
            {
                allSubtasks.map((subtask, index) => {
                    if (task?.id === subtask.taskId) {
                        return (
                            <SubtaskListItem key={index} subtask={subtask} />
                        )
                    }
                })
            }
            <CreateSubtask />
        </Stack>
    )
}