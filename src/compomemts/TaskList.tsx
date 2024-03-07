import { Stack } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { ITaskListProps } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ITask } from "../redux/types";
import { COMPLETED_LIST, IMPORTANT_LIST, MY_DAY_LIST, PLANED_LIST, SEARCH_LIST, TASKS_LIST } from "../constants/tasksListName";
import { TaskListItem } from "./TaskListItem";


export const TaskList: FC<ITaskListProps> = ({ listName }): ReactElement => {
   
   const taskLists = useSelector((state: RootState) => state.tasksSLice);
   const searchList = useSelector((state: RootState) => state.search.searchTaskList);

   const [taskList, setTaskList] = useState<ITask[]>([]);

   useEffect(() => {
      switch (listName) {
         case MY_DAY_LIST:
            setTaskList(taskLists.myDayList);
            break;
         case IMPORTANT_LIST:
            setTaskList(taskLists.importantList);
            break;
         case PLANED_LIST:
            setTaskList(taskLists.planedList);
            break;
         case COMPLETED_LIST:
            setTaskList(taskLists.completedList);
            break;
         case TASKS_LIST:
            setTaskList(taskLists.tasksList);
            break;
         case SEARCH_LIST:
            setTaskList(searchList);
            break;
         default:
            setTaskList(taskLists.allList);
            break;
      }
   }, [taskLists, searchList])

   return (
      <Stack direction={'column'} p={4}>
         {
            taskList.map((task, index): ReactElement => {
               return (
                  <TaskListItem key={index} task={task} isSettings={false} />
               )
            })
         }
      </Stack>
   )
}