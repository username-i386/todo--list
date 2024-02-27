import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Stack } from "@chakra-ui/react";
import { TaskListItem } from "./TaskListItem";
import { SubtaskList } from "./SubtaskList";
import { AddTaskToMyDayList } from "./AddTaskToMyDayList";
import { AddPlanedDateToTask } from "./AddPlanedDateToTask";
import { AddRepeatToTask } from "./AddRepeatToTask";
import { TaskNote } from "./TaskNote";
import { TaskSettingsController } from "./TaskSettingsController";


export const TaskSettingsMenu: FC = (): ReactElement => {

   const task = useSelector((state: RootState) => state.taskMenu.task);

   if (task === undefined) return <></>

   return (
      <Stack direction={'column'} justify={'space-between'} h={'100%'}>
         <Stack direction={'column'} px={2} spacing={4}>
            <TaskListItem task={task} isSettings={true} />
            <SubtaskList />
            <AddTaskToMyDayList task={task} />
            <AddPlanedDateToTask task={task} />
            <AddRepeatToTask task={task} />
            <TaskNote task={task} />
         </Stack>
         <Stack p={2}>
            <TaskSettingsController task={task} />
         </Stack>
      </Stack>
   )
}