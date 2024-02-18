import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Box } from "@chakra-ui/react";
import { TaskListItem } from "./TaskListItem";


export const TaskSettingsMenu: FC = (): ReactElement => {

   const task = useSelector((state: RootState) => state.taskMenu.task);

   if (task === undefined) return <></>

   return (
      <Box w={'300px'} maxW={'300px'}>
         <TaskListItem task={task} listName=""/>
      </Box>
   )
}