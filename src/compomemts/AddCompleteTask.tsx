import { Stack, Icon } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { FaCheck } from "react-icons/fa";
import { IAddCompleteTaskProps } from "./types";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { ITask } from "../redux/types";
import { addTaskInAllList, addTaskInCompletedList, addTaskInMyDayList, addTaskInPlanedList, addTaskInRepeatList, addTaskInTasksList, removeTaskInAllList, removeTaskInCompletedList, removeTaskInImportantList, removeTaskInMyDayList, removeTaskInPlanedList, removeTaskInTasksList } from "../redux/slices/tasksSlice";
import { MY_DAY_LIST, PLANED_LIST, TASKS_LIST } from "../constants/tasksListName";
import { checkIsTaskInList } from "../utils/checkIsTaskInList";
import { updateTaskInSettingsBar } from "../utils/updateTaskInSettingsBar";


export const AddCompleteTask: FC<IAddCompleteTaskProps> = ({ task }): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const repeatList = useSelector((state: RootState) => state.tasksSLice.repeatList);
   const taskMenu = useSelector((state: RootState) => state.taskMenu);


   const completeTask = (): ITask => ({
      ...task,
      isComplete: !task.isComplete,
      list: {
         ...task.list,
         isAllList: true,
         isCompletedList: true,
      }
   })

   function addTaskToComplete() {
      dispatch(addTaskInCompletedList(completeTask()));
   }

   function removeTask() {
      if (task.repeat.isRepeat) {
         if (!checkIsTaskInList(repeatList, task)) {
            dispatch(addTaskInRepeatList(task));
         }
      }
      switch (task.listName) {
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
      if (taskMenu.isOpen) {
         updateTaskInSettingsBar(dispatch, completeTask());
      }
   }

   return (
      <Stack justify={'center'}
         align={'center'}
         rounded={'full'}
         border={'1px solid tomato'}
         boxSize={4}
         minW={4}
         cursor={'pointer'}
         onClick={handleCheckbox}
      >
         <Icon as={FaCheck}
            w={2} 
            minW={2} 
            color={task.isComplete ? 'tomato' : 'transparent'} 
            _hover={{ color: 'tomato' }} /> 
      </Stack>
   )
}