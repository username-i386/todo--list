import { FC } from "react"
import { ITask } from "../redux/types"

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
   listName: string
}

export interface IAddImportantTaskProps {
   task: ITask
}

export interface IAddCompleteTaskProps {
   task: ITask
   listName: string
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