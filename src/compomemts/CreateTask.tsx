import { Box, Button, Icon, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { IDate, IPlanedTaskState, ITask } from "../redux/types";
import { COMPLETED_LIST, IMPORTANT_LIST, MY_DAY_LIST, PLANED_LIST, TASKS_LIST } from "../constants/tasksListName";
import { getLocalDate } from "../utils/getLocalDate";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addTaskInAllList, addTaskInCompletedList, addTaskInImportantList, addTaskInMyDayList, addTaskInPlanedList, addTaskInRepeatList, addTaskInTasksList } from "../redux/slices/tasksSlice";
import { ICreateTaskProps, ITaskMenuItem } from "./types";
import { LiaCalendarSolid } from "react-icons/lia";
import { PiRepeatLight } from "react-icons/pi";
import { PlanedTaskMenu } from "./PlanedTaskMenu";
import { setPlanedToTask } from "../redux/slices/planedTaskSlice";
import { RepeatTaskMenu } from "./RepeatTaskMenu";
import { setRepeatToTask } from "../redux/slices/repeatTaskSlice";
import { BsCalendar2Range, BsCalendar3, BsCalendar3Week, BsCalendar4, BsCalendar4Event } from "react-icons/bs";
import { REPEAT_DAILY, REPEAT_MONTHLY, REPEAT_WEEKLY, REPEAT_WORK_DAY, REPEAT_YEARLY } from "../constants/createTaskMenuItemsVariant";
import { handlerToRepeatTaskMenu } from "../utils/handlerRepeatTaskMenu";
import { addTaskToList } from "../utils/addTaskToList";
import { REPEAT_TASK_MENU_ITEMS } from "../constants/repeatTaskMenuItems";


export const CreateTask: FC<ICreateTaskProps> = ({ listName }): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const planedTaskDate = useSelector((state: RootState) => state.planedTask.date);
   const repeatTask = useSelector((state: RootState) => state.repeatTask.repeatTask);


   const [taskTitle, setTaskTitle] = useState('');

   function createTask(): ITask {
      const task: ITask  = {
         id: nanoid(),
         title: taskTitle,
         listName: listName,
         isComplete: false,
         repeat: repeatTask,
         isImportant: false,
         planedDate: planedTaskDate,
         createdDate: {
            year: getLocalDate().today.year,
            month: getLocalDate().today.month,
            day: getLocalDate().today.day,
         },
         list: {
            isAllList: true,
            isTasksList: (listName === TASKS_LIST) ? true : false,
            isMyDayList: (listName === MY_DAY_LIST) ? true : false,
            isPlanedList: (planedTaskDate) ? true : false,
            isCompletedList: (listName === COMPLETED_LIST) ? true : false,
            isImportantList: (listName === IMPORTANT_LIST) ? true : false,
            isRepeatList: repeatTask.isRepeat,
         },
      };
      return task;
   }

   function handleKeyboardEnter(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.code === 'Enter') {
         addTaskToList(createTask(), dispatch);
         setTaskTitle('');

         dispatch(setPlanedToTask(undefined));
         dispatch(setRepeatToTask({
            isRepeat: false,
            nextDateRepeat: undefined,
            repeatVariant: '',
         }))
      } 
   }

   function handleAddButton() {
      if (taskTitle !== '') {
         addTaskToList(createTask(), dispatch);
         setTaskTitle('');
   
         dispatch(setPlanedToTask(undefined));
         dispatch(setRepeatToTask({
            isRepeat: false,
            nextDateRepeat: undefined,
            repeatVariant: '',
         }))
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
            <Stack direction={'row'} align={'center'}>
               <PlanedTaskMenu />
               <RepeatTaskMenu taskMenuItems={REPEAT_TASK_MENU_ITEMS} 
                  handlerMenuItem={handlerToRepeatTaskMenu}
                  isNewTask={true}  />
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