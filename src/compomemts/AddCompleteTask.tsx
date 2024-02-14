import { Stack, Icon } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { FaCheck } from "react-icons/fa";
import { IAddCompleteTaskProps } from "./types";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ITask } from "../redux/types";
import { addTaskInAllList, addTaskInCompletedList, addTaskInMyDayList, addTaskInPlanedList, addTaskInTasksList, removeTaskInAllList, removeTaskInCompletedList, removeTaskInImportantList, removeTaskInMyDayList, removeTaskInPlanedList, removeTaskInTasksList } from "../redux/slices/tasksSlice";
import { MY_DAY_LIST, PLANED_LIST, TASKS_LIST } from "../constants/tasksListName";


export const AddCompleteTask: FC<IAddCompleteTaskProps> = ({ task, listName }): ReactElement => {

   const dispatch: AppDispatch = useDispatch();


   const completeTask = (): ITask => ({
      ...task,
      isComplete: !task.isComplete,
      list: {
         isAllList: true,
         isCompletedList: true,
         isImportantList: task.list.isImportantList,
         isMyDayList: task.list.isMyDayList,
         isPlanedList: task.list.isPlanedList,
         isTasksList: task.list.isTasksList,
         isRepeatList: task.list.isRepeatList,
      }
   })

   function addTaskToComplete() {
      // const completeTask: ITask = {
      //    ...task,
      //    isComplete: true,
      //    list: {
      //       isAllList: true,
      //       isCompletedList: true,
      //       isImportantList: task.list.isImportantList,
      //       isMyDayList: task.list.isMyDayList,
      //       isPlanedList: task.list.isPlanedList,
      //       isTasksList: task.list.isTasksList,
      //    }
      // };
      dispatch(addTaskInCompletedList(completeTask()));
   }

   function removeTask() {
      switch (listName) {
         case MY_DAY_LIST:
            dispatch(removeTaskInMyDayList(task.id));
            break;
         case PLANED_LIST:
            dispatch(removeTaskInPlanedList(task.id));
            break;
         case TASKS_LIST:
            dispatch(removeTaskInTasksList(task.id));
            break;
      }
      dispatch(removeTaskInImportantList(task.id));
      dispatch(removeTaskInAllList(task.id));
   }

   function returnTaskInComplete() {
      if (task.list.isMyDayList) {
         dispatch(addTaskInMyDayList(completeTask()));
      }
      if (task.list.isPlanedList) {
         dispatch(addTaskInPlanedList(completeTask()));
      }
      if (task.list.isTasksList) {
         dispatch(addTaskInTasksList(completeTask()));
      }

      dispatch(addTaskInAllList(completeTask()));

      dispatch(removeTaskInCompletedList(task.id));
   }

   function handleCheckbox() {
      if (!task.isComplete) {
         addTaskToComplete();
         removeTask();
      } else {
         returnTaskInComplete();
      }
   }

   return (
      <Stack justify={'center'}
         align={'center'}
         rounded={'full'}
         border={'1px solid tomato'}
         boxSize={4}
         cursor={'pointer'}
         onClick={handleCheckbox}
      >
         <Icon as={FaCheck}
            w={2} 
            color={task.isComplete ? 'tomato' : 'transparent'} 
            _hover={{ color: 'tomato' }} /> 
      </Stack>
   )
}