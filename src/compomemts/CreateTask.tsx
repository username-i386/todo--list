import { Box, Button, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ITask } from "../redux/types";
import { COMPLETED_LIST, IMPORTANT_LIST, MY_DAY_LIST, PLANED_LIST, TASKS_LIST } from "../constants/tasksListName";
import { getLocalDate } from "../utils/getLocalDate";
import { nanoid } from "nanoid";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addTaskInAllList, addTaskInCompletedList, addTaskInImportantList, addTaskInMyDayList, addTaskInPlanedList, addTaskInTasksList } from "../redux/slices/tasksSlice";
import { ICreateTaskProps } from "./types";
import { LiaCalendarSolid } from "react-icons/lia";
import { PiRepeatLight } from "react-icons/pi";
import { PlanedTaskMenu } from "./PlanedTaskMenu";


export const CreateTask: FC<ICreateTaskProps> = ({ listName }): ReactElement => {

   const dispatch: AppDispatch = useDispatch();
   
   const [taskTitle, setTaskTitle] = useState('');

   function createTask(): ITask {
      return {
         id: nanoid(),
         title: taskTitle,
         listName: listName,
         isComplete: false,
         isRepeat: false,
         isImportant: false,
         date: {
            year: getLocalDate().year,
            month: getLocalDate().month,
            day: getLocalDate().day,
         },
         list: {
            isAllList: true,
            isTasksList: (listName === TASKS_LIST) ? true : false,
            isMyDayList: (listName === MY_DAY_LIST) ? true : false,
            isPlanedList: (listName === PLANED_LIST) ? true : false,
            isCompletedList: (listName === COMPLETED_LIST) ? true : false,
            isImportantList: (listName === IMPORTANT_LIST) ? true : false,
         },
      };
   }

   function handleKeyboardEnter(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.code === 'Enter') {
         addTaskToList(createTask());
         setTaskTitle('');
      } 
   }

   function handleAddButton() {
      addTaskToList(createTask());
      setTaskTitle('');
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
               {
                  (taskTitle === '') ? 
                     <Button size={'sm'}
                        variant='outline'
                        colorScheme={'blue'}
                        isDisabled
                     >
                        Добавить
                     </Button>
                  : 
                     <Button size={'sm'}
                        variant='outline'
                        colorScheme={'blue'}
                        onClick={handleAddButton}
                     >
                        Добавить
                     </Button>
               }
            </Box>
         </Stack>
      </Box>
   )
}