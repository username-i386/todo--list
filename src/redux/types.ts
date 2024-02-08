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
   isRepeat: boolean
   isImportant: boolean
   date: {
      year: number
      month: number
      day: number
   }
   list: {
      isMyDayList: boolean
      isImportantList: boolean
      isPlanedList: boolean
      isAllList: boolean
      isTasksList: boolean
      isCompletedList: boolean
   }
}
export interface ITasksState {
   myDayList: ITask[]
   importantList: ITask[]
   planedList: ITask[]
   allList: ITask[]
   completedList: ITask[]
   tasksList: ITask[]
}

//!Planed Task Slice------------------------------------------------------------------------------------------------------------------------------------

export interface IPlanedTaskState {
   date: IPlanedTaskDate | null
}
export interface IPlanedTaskDate {
   year: number
   month: number
   day: number
}

//!------------------------------------------------------------------------------------------------------------------------------------