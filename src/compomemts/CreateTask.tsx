import { Box, Button, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IPlanedTaskDate, IPlanedTaskState, ITask } from "../redux/types";
import { COMPLETED_LIST, IMPORTANT_LIST, MY_DAY_LIST, PLANED_LIST, TASKS_LIST } from "../constants/tasksListName";
import { getLocalDate } from "../utils/getLocalDate";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addTaskInAllList, addTaskInCompletedList, addTaskInImportantList, addTaskInMyDayList, addTaskInPlanedList, addTaskInTasksList } from "../redux/slices/tasksSlice";
import { ICreateTaskProps } from "./types";
import { LiaCalendarSolid } from "react-icons/lia";
import { PiRepeatLight } from "react-icons/pi";
import { PlanedTaskMenu } from "./PlanedTaskMenu";
import { setPlanedToTask } from "../redux/slices/planedTask";


export const CreateTask: FC<ICreateTaskProps> = ({ listName }): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const planedTaskDate = useSelector((state: RootState) => state.planedTask.date);
   
   const [taskTitle, setTaskTitle] = useState('');

   function createTask(): ITask {
      return {
         id: nanoid(),
         title: taskTitle,
         listName: listName,
         isComplete: false,
         isRepeat: false,
         isImportant: false,
         date: planedTaskDate,
         list: {
            isAllList: true,
            isTasksList: (listName === TASKS_LIST) ? true : false,
            isMyDayList: (listName === MY_DAY_LIST) ? true : false,
            isPlanedList: (planedTaskDate) ? true : false,
            isCompletedList: (listName === COMPLETED_LIST) ? true : false,
            isImportantList: (listName === IMPORTANT_LIST) ? true : false,
         },
      };
   }

   function handleKeyboardEnter(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.code === 'Enter') {
         addTaskToList(createTask());
         setTaskTitle('');

         dispatch(setPlanedToTask(undefined))
      } 
   }

   function handleAddButton() {
      addTaskToList(createTask());
      setTaskTitle('');

      dispatch(setPlanedToTask(undefined))
   }

   function addTaskToList(task: ITask) {
      if (taskTitle !== '') {
         if (task.list.isAllList) {
            dispatch(addTaskInAllList(task));
         }

         if (task.list.isCompletedList) {
            dispatch(addTaskInCompletedList(task));
         }

         if (task.list.isImportantList) {
            dispatch(addTaskInImportantList(task));
         }

         if (task.list.isMyDayList) {
            dispatch(addTaskInMyDayList(task));
         }

         if (task.list.isPlanedList) {
            dispatch(addTaskInPlanedList(task));
         }

         if (task.list.isTasksList) {
            dispatch(addTaskInTasksList(task));
         }
      }
   }

   return (
      <Box px={4}>
         <InputGroup>
            <InputLeftElement pointerEvents='none'>
               <Icon as={FaPencilAlt} />
            </InputLeftElement>
            <Input type='text' 
               placeholder='Добавить задачу' 
               variant='flushed'
               _placeholder={{ color: 'blue.600', fontWeight: 600 }}
               value={taskTitle}
               onChange={e => setTaskTitle(e.target.value)}
               onKeyDown={e => handleKeyboardEnter(e)}
            />
         </InputGroup>
         <Stack direction={'row'} justify={'space-between'} align={'center'} p={2}>
            <Stack direction={'row'}>
               <PlanedTaskMenu />
               {/* <Icon as={LiaCalendarSolid} boxSize={5} cursor={'pointer'} /> */}
               <Icon as={PiRepeatLight} boxSize={5} cursor={'pointer'} />
            </Stack>
            <Box>
               <Button size={'sm'}
                  variant='outline'
                  colorScheme={'blue'}
                  onClick={handleAddButton}
                  isDisabled={taskTitle === '' ? true : false}
               >
                  Добавить
               </Button>
            </Box>
         </Stack>
      </Box>
   )
}