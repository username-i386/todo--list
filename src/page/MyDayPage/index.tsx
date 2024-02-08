import { Box, Heading, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { GoSun } from "react-icons/go";
import { TodoTitle } from "../../compomemts/TodoTitle";
import { CreateTask } from "../../compomemts/CreateTask";
import { MY_DAY_LIST } from "../../constants/tasksListName";
import { TaskList } from "../../compomemts/TaskList";
import { TaskListMenu } from "../../compomemts/TaskListMenu";


export const MyDayPage: FC = (): ReactElement => {


   return (
      <Box>
         <TodoTitle title={'Мой день'} icon={GoSun} />
         <CreateTask listName={MY_DAY_LIST} />
         <TaskListMenu listName={MY_DAY_LIST} />
         
         
      </Box>
   )
}