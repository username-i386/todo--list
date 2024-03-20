import { Stack, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { ITaskListItemState } from "./types";
import { AddImportantTask } from "./AddImportantTask";
import { AddCompleteTask } from "./AddCompleteTask";
import { useDispatch } from "react-redux";
import { toggleTaskMenu } from "../redux/slices/taskMenuSlice";
import { TaskAttribute } from "./TaskAttributes";


export const TaskListItem: FC<ITaskListItemState> = ({ task, isSettings }): ReactElement => {

   const dispatch = useDispatch();

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
            {
               !isSettings ?
                  <TaskAttribute task={task} />
               : <></>
            }
         </Box>

         <AddImportantTask task={task} />
      </Stack>
   )
}