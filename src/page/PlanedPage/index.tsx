import { FC, ReactElement } from "react";
import { MainContent } from "../../compomemts/MainContent";
import { LiaCalendarSolid } from "react-icons/lia";
import { PLANED_LIST } from "../../constants/tasksListName";


export const PlanedPage: FC = (): ReactElement => {
   return (
      <MainContent title={'Запланировано'} icon={LiaCalendarSolid} listName={PLANED_LIST} />
   )
}