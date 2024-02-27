import { FC, ReactElement } from "react";
import { MainContent } from "../../compomemts/MainContent";
import { CiStar } from "react-icons/ci";
import { IMPORTANT_LIST } from "../../constants/tasksListName";


export const ImportantPage: FC = (): ReactElement => {
   return (
      <MainContent title={'Важное'} icon={CiStar} listName={IMPORTANT_LIST} />
   )
}