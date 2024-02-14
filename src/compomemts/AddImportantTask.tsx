import { Stack, Icon } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { CiStar } from "react-icons/ci";
import { PiStarFill } from "react-icons/pi";
import { IAddImportantTaskProps } from "./types";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ITask } from "../redux/types";
import { addTaskInImportantList, removeTaskInImportantList } from "../redux/slices/tasksSlice";
import { checkIsTaskInList } from "../utils/checkIsTaskInList";


export const AddImportantTask: FC<IAddImportantTaskProps> = ({ task }): ReactElement => {
   
   const dispatch: AppDispatch = useDispatch();

   const importantTaskList = useSelector((state: RootState) => state.tasksSLice.importantList);
   const completedList = useSelector((state: RootState) => state.tasksSLice.completedList);

   function addTaskToImportantList() {
      const importantTask: ITask = {
         ...task, 
         isImportant: true, 
         list: {
            isAllList: true,
            isImportantList: true,
            isMyDayList: task.list.isMyDayList,
            isPlanedList: task.list.isPlanedList,
            isTasksList: task.list.isTasksList,
            isCompletedList: task.list.isCompletedList,
            isRepeatList: task.list.isRepeatList,
         }
      };
      
      if (!checkIsTaskInList(importantTaskList, task)) {
         if (!task.isComplete) {
            dispatch(addTaskInImportantList(importantTask));
         }
      } else {
         dispatch(removeTaskInImportantList(task.id));
      }
   }

   
   
   return (
      <Stack>
         <Icon as={checkIsTaskInList(importantTaskList, task) ? PiStarFill : CiStar} 
            color={checkIsTaskInList(importantTaskList, task) ? 'blue.500' : ''}
            boxSize={6} 
            cursor={'pointer'} 
            onClick={addTaskToImportantList} />
      </Stack>
   )
}