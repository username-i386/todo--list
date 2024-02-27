import { Stack, Icon, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { FaCheck } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MY_DAY_LIST } from "../constants/tasksListName";
import { ITaskListItemState } from "./types";
import { AddImportantTask } from "./AddImportantTask";
import { AddCompleteTask } from "./AddCompleteTask";
import { PlanedTaskMenu } from "./PlanedTaskMenu";
import { LiaCalendarSolid } from "react-icons/lia";
import { outputDeadline } from "../utils/outputDeadline";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { PiRepeatLight } from "react-icons/pi";
import { outputRepeatVariant } from "../utils/outputRepeatVariant";
import { toggleTaskMenu } from "../redux/slices/taskMenuSlice";


export const TaskListItem: FC<ITaskListItemState> = ({ task }): ReactElement => {

   const dispatch = useDispatch();
   
   const itemsBorder = useColorModeValue('blue.500', 'blue.200')
   
   const planedTaskDate = useSelector((state: RootState) => state.planedTask.date);

   function openTaskMenu() {
      dispatch(toggleTaskMenu({
         isOpen: true,
         task: task,
      }))
   }

   return (
      <Stack direction={'row'} justify={'space-between'} align={'center'} p={2} wordBreak={'break-all'}>
         <AddCompleteTask task={task} />

         <Box flex={'1 1 auto'} cursor={'pointer'} onClick={openTaskMenu}>
            <Box>
               <Text textDecoration={task.isComplete ? 'line-through' : ''} >
                  {task.title}
               </Text>
            </Box>
            <Stack direction={'row'} align={'center'} pt={1}>
               {
                  (task.listName === MY_DAY_LIST) ?
                     <Stack direction={'row'} align={'center'}>
                        <Icon as={GoSun} boxSize={3} />
                        <Text fontSize={'xs'}>Мой день</Text>
                     </Stack>
                  : <></>
               }
               {
                  (task.planedDate?.day && task.planedDate.month && task.planedDate.year) ?
                     <Stack direction={'row'} align={'center'} gap={2}>
                        <Icon as={LiaCalendarSolid} boxSize={4} />
                        <Text fontSize={'xs'}>
                           {
                              outputDeadline(task.planedDate)
                           }
                        </Text>
                     </Stack>
                  : <></>
               }
               {
                  task.repeat.isRepeat ? 
                     <Stack direction={'row'} align={'center'} gap={2}>
                        <Icon as={PiRepeatLight} boxSize={4} />
                        <Text fontSize={'xs'}>
                           {
                              outputRepeatVariant(task.repeat.repeatVariant)
                           }
                        </Text>
                     </Stack>
                  : <></>
               }
            </Stack>
         </Box>

         <AddImportantTask task={task} />
      </Stack>
   )
}