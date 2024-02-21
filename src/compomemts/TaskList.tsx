import { Box, Icon, Stack, Text } from "@chakra-ui/react"
import { FC, ReactElement, useEffect, useState } from "react"
import { FaCheck } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { ITaskListProps } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ITask } from "../redux/types";
import { COMPLETED_LIST, IMPORTANT_LIST, MY_DAY_LIST, PLANED_LIST, TASKS_LIST } from "../constants/tasksListName";
import { GoSun } from "react-icons/go";
import { TaskListItem } from "./TaskListItem";


export const TaskList: FC<ITaskListProps> = ({ listName }): ReactElement => {
   
   const taskLists = useSelector((state: RootState) => state.tasksSLice);
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
         default:
            setTaskList(taskLists.allList);
            break;
      }
   }, [taskLists])

   return (
      <Stack direction={'column'} p={4}>
         {
            taskList.map((task, index): ReactElement => {
               return (
                  <TaskListItem key={index} task={task} />
               )
            })
         }
      </Stack>
   )
}