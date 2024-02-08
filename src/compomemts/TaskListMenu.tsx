import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { TaskList } from "./TaskList";
import { COMPLETED_LIST, IMPORTANT_LIST, MY_DAY_LIST, PLANED_LIST, TASKS_LIST } from "../constants/tasksListName";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ITask } from "../redux/types";
import { ITaskListMenuProps } from "./types";


export const TaskListMenu: FC<ITaskListMenuProps> = ({ listName }): ReactElement => {

   const titleColor = useColorModeValue('gray.600', 'gray.300');

   const taskLists = useSelector((state: RootState) => state.tasksSLice);

   const [taskList, setTaskList] = useState<ITask[]>([]);

   useEffect(() => {
      switch (listName) {
         case MY_DAY_LIST:
            setTaskList(taskLists.myDayList);
            break;
         case IMPORTANT_LIST:
            setTaskList(taskLists.importantList);
            break;
         case PLANED_LIST:
            setTaskList(taskLists.planedList);
            break;
         case COMPLETED_LIST:
            setTaskList(taskLists.completedList);
            break;
         case TASKS_LIST:
            setTaskList(taskLists.tasksList);
            break;
         default:
            setTaskList(taskLists.allList);
            break;
      }
   }, [taskLists])

   return (
      <Accordion defaultIndex={[0]} allowMultiple>
         {
            (taskList.length > 0) ? 
               <AccordionItem>
                  <h2>
                     <AccordionButton>
                        <Box flex='1' textAlign='left'>
                           <Text as='span'>Задачи</Text>
                           <Text as='span' color={titleColor}>
                              {` (${taskList.length})`}
                           </Text>
                        </Box>
                        <AccordionIcon />
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                     <TaskList listName={listName} />
                  </AccordionPanel>
               </AccordionItem>
            : <></>
         }

         {
            taskLists.completedList.length > 0 ? 
               <AccordionItem>
                  <h2>
                     <AccordionButton disabled>
                        <Box flex='1' textAlign='left'>
                           <Text as='span'>Завершенные</Text>
                           <Text as='span' color={titleColor}>
                              {` (${taskLists.completedList.length})`}
                           </Text>
                        </Box>
                        <AccordionIcon />
                     </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                     <TaskList listName={COMPLETED_LIST} />
                  </AccordionPanel>
               </AccordionItem>
            : <></>
         }
      </Accordion>
   )
}