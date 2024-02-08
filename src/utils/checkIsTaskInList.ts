import { ITask } from "../redux/types";


export function checkIsTaskInList(taskList: ITask[], task: ITask): boolean {
   for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].id === task.id) {
         return true;
      }
   }
   return false;
}