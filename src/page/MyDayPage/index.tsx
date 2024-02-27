import { FC, ReactElement } from "react";
import { GoSun } from "react-icons/go";
import { MY_DAY_LIST } from "../../constants/tasksListName";
import { MainContent } from "../../compomemts/MainContent";


export const MyDayPage: FC = (): ReactElement => {
   return (
      <MainContent title={'Мой день'} icon={GoSun} listName={MY_DAY_LIST} />
   )
}