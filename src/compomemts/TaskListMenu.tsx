import { Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { TaskList } from "./TaskList";
import { COMPLETED_LIST, IMPORTANT_LIST, MY_DAY_LIST, PLANED_LIST, SEARCH_LIST, TASKS_LIST } from "../constants/tasksListName";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { ITask } from "../redux/types";
import { ITaskListMenuProps } from "./types";
import { moveTaskFromRepeatListToMyDayList } from "../utils/moveTaskFromRepeatListToMyDayList";


export const TaskListMenu: FC<ITaskListMenuProps> = ({ listName }): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const titleColor = useColorModeValue('gray.600', 'gray.300');

   const taskLists = useSelector((state: RootState) => state.tasksSLice);
   const searchList = useSelector((state: RootState) => state.search.searchTaskList);


   const [taskList, setTaskList] = useState<ITask[]>([]);

   useEffect(() => {
      moveTaskFromRepeatListToMyDayList(taskLists.repeatList, dispatch);
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
         case SEARCH_LIST:
            setTaskList(searchList);
            break;
         default:
            setTaskList(taskLists.allList);
            break;
      }
   }, [taskLists, searchList])
   
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