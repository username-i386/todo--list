import { FC } from "react"
import { ISubtask, ITask } from "../redux/types"

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
   handlerMenuItem: (variant: string) => void
}

export interface ISubtaskListItemProps {
   subtask: ISubtask
}

export interface IConfirmDeletionModalProps {
   isOpen: boolean
   onClose: () => void
   subtask: ISubtask
}