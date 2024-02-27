import { Box } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { CreateTask } from "./CreateTask";
import { TaskListMenu } from "./TaskListMenu";
import { TodoTitle } from "./TodoTitle";
import { IMainContentProps } from "./types";


export const MainContent: FC<IMainContentProps> = ({
   title,
   icon,
   listName,
}): ReactElement => {
   return (
      <Box>
         <TodoTitle title={title} icon={icon} />
         <CreateTask listName={listName} />
         <TaskListMenu listName={listName} />
      </Box>
   )
}