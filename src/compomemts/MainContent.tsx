import { Box } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { CreateTask } from "./CreateTask";
import { TaskListMenu } from "./TaskListMenu";
import { TodoTitle } from "./TodoTitle";
import { IMainContentProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteCompletedTask } from "../utils/deleteCompletedTask";
import { moveTaskFromMyDayToTasks } from "../utils/moveTaskFtomMyDayToTasks";


export const MainContent: FC<IMainContentProps> = ({
   title,
   icon,
   listName,
}): ReactElement => {
   
   const dispatch: AppDispatch = useDispatch();
   const taskLists = useSelector((state: RootState) => state.tasksSLice);

   moveTaskFromMyDayToTasks(taskLists.myDayList, dispatch);
   deleteCompletedTask(taskLists.completedList, dispatch);

   return (
      <Box>
         <TodoTitle title={title} icon={icon} />
         <CreateTask listName={listName} />
         <TaskListMenu listName={listName} />
      </Box>
   )
}