import { Box, Hide, Show } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { CreateTask } from "./CreateTask";
import { TaskListMenu } from "./TaskListMenu";
import { TodoTitle } from "./TodoTitle";
import { IMainContentProps } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteCompletedTask } from "../utils/deleteCompletedTask";
import { moveTaskFromMyDayToTasks } from "../utils/moveTaskFtomMyDayToTasks";
import { SEARCH_LIST } from "../constants/tasksListName";
import { TaskSettingsMenuMobile } from "./TaskSettingsMenuMobile";
import { WIDTH_900_PX } from "../constants/windowWidth";


export const MainContent: FC<IMainContentProps> = ({
   title,
   icon,
   listName,
}): ReactElement => {
   
   const dispatch: AppDispatch = useDispatch();
   const taskLists = useSelector((state: RootState) => state.tasksSLice);
   const searchList = useSelector((state: RootState) => state.search.searchTaskList);
   

   moveTaskFromMyDayToTasks(taskLists.myDayList, dispatch);
   deleteCompletedTask(taskLists.completedList, dispatch);

   return (
      <>
         {
            (searchList.length === 0) ? 
               <Box>
                  <TodoTitle title={title} icon={icon} />
                  <CreateTask listName={listName} />
                  <TaskListMenu listName={listName} />
               </Box>
            : <Box>
               <TaskListMenu listName={SEARCH_LIST} />
            </Box>
         }
         <Show breakpoint={`(max-width: ${WIDTH_900_PX})`}>
            <TaskSettingsMenuMobile />
         </Show>
      </>
      
   )
}