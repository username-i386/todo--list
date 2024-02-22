import { Button, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { IAddPlanedDateToTaskProps } from "./types";
import { LiaCalendarSolid } from "react-icons/lia";
import { IDate, ITask } from "../redux/types";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { addTaskInAllList, addTaskInCompletedList, addTaskInImportantList, addTaskInMyDayList, addTaskInPlanedList, addTaskInRepeatList, addTaskInTasksList, removeTaskInAllList, removeTaskInCompletedList, removeTaskInImportantList, removeTaskInMyDayList, removeTaskInPlanedList, removeTaskInRepeatList, removeTaskInTasksList } from "../redux/slices/tasksSlice";


export const AddPlanedDateToTask: FC<IAddPlanedDateToTaskProps> = ({ task }): ReactElement => {
    
    const dispatch: AppDispatch = useDispatch();

    const defaultDateValue = (): string => {
        if (task.date) {
            const date = {
                year: String(task.date.year),
                month: String(task.date.month).padStart(2, '0'),
                day: String(task.date.day).padStart(2, '0'),
            }
            
            return date.year + '-' + date.month  + '-' + date.day;
        } else {
            return '';
        }
    }

    function addPlanedDateToTask() {
        const dateInput = document.querySelector('#dateInput') as HTMLInputElement;
        const datePlanedTask: IDate = {
            year: +dateInput.value.split('-')[0],
            month: +dateInput.value.split('-')[1],
            day: +dateInput.value.split('-')[2],
        }
        const planedTask: ITask = {
            ...task,
            date: datePlanedTask,
            list: {
                ...task.list,
                isPlanedList: true,
            },
        }
        removeDeprecatedTask(planedTask);
        addUpdatedTask(planedTask);
    }

    function removeDeprecatedTask(task: ITask) {
        if (task.list.isAllList) {
            dispatch(removeTaskInAllList(task.id));
        }

        if (task.list.isCompletedList) {
            dispatch(removeTaskInCompletedList(task.id));
        }

        if (task.list.isImportantList) {
            dispatch(removeTaskInImportantList(task.id));
        }

        if (task.list.isMyDayList) {
            dispatch(removeTaskInMyDayList(task.id));
        }

        if (task.list.isPlanedList) {
            dispatch(removeTaskInPlanedList(task.id));
        }

        if (task.list.isRepeatList) {
            dispatch(removeTaskInRepeatList(task.id));
        }

        if (task.list.isTasksList) {
            dispatch(removeTaskInTasksList(task.id));
        }
    }

    function addUpdatedTask(task: ITask) {
        if (task.list.isAllList) {
            dispatch(addTaskInAllList(task));
        }

        if (task.list.isCompletedList) {
            dispatch(addTaskInCompletedList(task));
        }

        if (task.list.isImportantList) {
            dispatch(addTaskInImportantList(task));
        }

        if (task.list.isMyDayList) {
            dispatch(addTaskInMyDayList(task));
        }

        if (task.list.isPlanedList) {
            dispatch(addTaskInPlanedList(task));
        }

        if (task.list.isRepeatList) {
            dispatch(addTaskInRepeatList(task));
        }

        if (task.list.isTasksList) {
            dispatch(addTaskInTasksList(task));
        }
    }
    
    return (
        <Stack direction={'row'} align={'center'} >
            <Stack>
                <Icon as={LiaCalendarSolid} boxSize={5} />
            </Stack>
            <Stack flex={'1 1 auto'}>
                <Input id='dateInput'
                    placeholder="Select Date and Time"
                    defaultValue={defaultDateValue()}
                    size="md"
                    type="date" />
            </Stack>
            <Stack>
                <Button colorScheme='blue' 
                    bg={'blue.500'} 
                    color={'white'}
                    onClick={addPlanedDateToTask}>
                    Сохранить
                </Button>
            </Stack>
        </Stack>
    )
}