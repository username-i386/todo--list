import { FC } from "react"
import { ISubtask, ITask } from "../redux/types"
import { AppDispatch } from "../redux/store"

export interface IToggleMenuIconProps {
   isNavBar: boolean
}

export interface ITodoTitleProps {
   icon: FC
   title: string
}

export interface ICreateTaskProps {
   listName: string
}

export interface ITaskListProps {
   listName: string
}

export interface ITaskListItemState {
   task: ITask
   isSettings: boolean
}

export interface IAddImportantTaskProps {
   task: ITask
}

export interface IAddCompleteTaskProps {
   task: ITask
}

export interface ITaskListMenuProps {
   listName: string
}

export interface ICreateTaskMenuItemProps {
   icon: FC
   title: string
   dayShortName: string
   variant: string
   task?: ITask
   onClose: () => void
   handlerMenuItem: (variant: string, dispatch: AppDispatch, onClose: () => void, task?: ITask) => void
}

export interface ISubtaskListItemProps {
   subtask: ISubtask
}

export interface IConfirmDeletionModalProps {
   isOpen: boolean
   onClose: () => void
   subtask?: ISubtask
   task?: ITask
}

export interface IAddTaskToMyDayListProps {
   task: ITask
}

export interface IAddPlanedDateToTaskProps {
   task: ITask
}

export interface IAddRepeatToTaskProps {
   task: ITask
}

export interface IRepeatTaskMenuProps {
   isNewTask: boolean
   taskMenuItems: ITaskMenuItem[]
   // deleteRepeat: () => void
   task?: ITask
   handlerMenuItem: (variant: string, dispatch: AppDispatch, onClose: () => void, task?: ITask) => void
}

export interface ITaskMenuItem {
   icon: FC
   title: string
   dayShortName: string
   variant: string
}

export interface IRepeatTriggerProps {
   onOpen: () => void
}

export interface ITaskNoteProps {
   task: ITask
}

export interface ITaskSettingsControllerProps {
   task: ITask
}

export interface IMainContentProps {
   title: string
   icon: FC
   listName: string
}