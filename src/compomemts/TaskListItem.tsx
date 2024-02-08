import { Stack, Icon, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { FaCheck } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { MY_DAY_LIST } from "../constants/tasksListName";
import { ITaskListItemState } from "./types";
import { AddImportantTask } from "./AddImportantTask";
import { AddCompleteTask } from "./AddCompleteTask";


export const TaskListItem: FC<ITaskListItemState> = ({ task, listName }): ReactElement => {
   
   const itemsBorder = useColorModeValue('blue.500', 'blue.200')
   
   return (
      <Stack direction={'row'} justify={'space-between'} align={'center'} p={2}>
         <AddCompleteTask task={task} listName={listName} />

         <Box flex={'1 0 auto'}>
            <Text textDecoration={task.isComplete ? 'line-through' : ''} >
               {task.title}
            </Text>
            <Stack>
               {
                  (task.listName === MY_DAY_LIST) ?
                     <Stack direction={'row'} align={'center'}>
                        <Icon as={GoSun} boxSize={3} />
                        <Text fontSize={'xs'}>Мой день</Text>
                     </Stack>
                     : <></>
               }
            </Stack>
         </Box>

         <AddImportantTask task={task} />
      </Stack>
   )
}