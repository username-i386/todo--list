//!Menu Slice------------------------------------------------------------------------------------------------------------------------------------

export interface IMenuSliceState {
   isMenuOpen: boolean
}

//!Tasks Slice------------------------------------------------------------------------------------------------------------------------------------

export interface ITask {
   id: string
   title: string
   listName: string
   isComplete: boolean
   repeat: IRepeatTask
   isImportant: boolean
   date: {
      year: number
      month: number
      day: number
   } | undefined
   list: {
      isMyDayList: boolean
      isImportantList: boolean
      isPlanedList: boolean
      isAllList: boolean
      isTasksList: boolean
      isCompletedList: boolean
      isRepeatList: boolean
   }
}
export interface ITasksState {
   myDayList: ITask[]
   importantList: ITask[]
   planedList: ITask[]
   allList: ITask[]
   completedList: ITask[]
   tasksList: ITask[]
   repeatList: ITask[]
}

//!Planed Task Slice------------------------------------------------------------------------------------------------------------------------------------

export interface IPlanedTaskState {
   date: IDate | undefined
}

export interface IDate {
   year: number
   month: number
   day: number
}

//!Repeat Task Slice------------------------------------------------------------------------------------------------------------------------------------

export interface IRepeatTaskState {
   repeatTask: IRepeatTask
}

export interface IRepeatTask {
   isRepeat: boolean
   nextDateRepeat: IDate | undefined
   repeatVariant: string,
}

//!Task Menu Slice------------------------------------------------------------------------------------------------------------------------------------

export interface ITaskMenuState {
   isOpen: boolean
   task: ITask | undefined
}

//!------------------------------------------------------------------------------------------------------------------------------------