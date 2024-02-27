import { FC, ReactElement } from "react";
import { MainContent } from "../../compomemts/MainContent";
import { ALL_LIST } from "../../constants/tasksListName";
import { PiInfinityThin } from "react-icons/pi";


export const AllPage: FC = (): ReactElement => {
   return (
      <MainContent title={'Все задачи'} icon={PiInfinityThin} listName={ALL_LIST} />
   )
}