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
import { useSelector } from "react-redux";


export const TaskListItem: FC<ITaskListItemState> = ({ task, listName }): ReactElement => {
   
   const itemsBorder = useColorModeValue('blue.500', 'blue.200')
   
   const planedTaskDate = useSelector((state: RootState) => state.planedTask.date);

   return (
      <Stack direction={'row'} justify={'space-between'} align={'center'} p={2}>
         <AddCompleteTask task={task} listName={listName} />

         <Box flex={'1 0 auto'}>
            <Text textDecoration={task.isComplete ? 'line-through' : ''} >
               {task.title}
            </Text>
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
                  (task.date?.day && task.date.month && task.date.year) ?
                     <Stack direction={'row'} align={'center'} gap={2}>
                        <Icon as={LiaCalendarSolid} boxSize={4} />
                        <Text fontSize={'xs'}>
                           {
                              outputDeadline(task.date)
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