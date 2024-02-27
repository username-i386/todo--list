import { FC, ReactElement } from "react";
import { TASKS_LIST } from "../../constants/tasksListName";
import { MainContent } from "../../compomemts/MainContent";
import { PiHouse } from "react-icons/pi";


export const TasksPage: FC = (): ReactElement => {
   return (
      <MainContent title={'Задачи'} icon={PiHouse} listName={TASKS_LIST} />
   )
}