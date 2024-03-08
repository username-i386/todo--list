import { toggleTaskMenu } from "../redux/slices/taskMenuSlice";
import { AppDispatch } from "../redux/store";
import { ITask } from "../redux/types";


export function updateTaskInSettingsBar(dispatch: AppDispatch, updatedTask: ITask): void {
    dispatch(toggleTaskMenu({
        isOpen: true,
        task: updatedTask,
    }));
}