import { Button, Icon, Input, Stack, Text } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { IAddPlanedDateToTaskProps } from "./types";
import { LiaCalendarSolid } from "react-icons/lia";
import { IDate, ITask } from "../redux/types";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { addTaskInAllList, addTaskInCompletedList, addTaskInImportantList, addTaskInMyDayList, addTaskInPlanedList, addTaskInRepeatList, addTaskInTasksList, removeTaskInAllList, removeTaskInCompletedList, removeTaskInImportantList, removeTaskInMyDayList, removeTaskInPlanedList, removeTaskInRepeatList, removeTaskInTasksList } from "../redux/slices/tasksSlice";
import { addTaskToList } from "../utils/addTaskToList";
import { deleteTaskToList } from "../utils/deleteTaskToList";


export const AddPlanedDateToTask: FC<IAddPlanedDateToTaskProps> = ({ task }): ReactElement => {
    
    const dispatch: AppDispatch = useDispatch();

    const [defaultDateValue, setDefaultDateValue] = useState('');

    useEffect(() => {
        if (task.date) {
            const date = {
                year: String(task.date.year),
                month: String(task.date.month).padStart(2, '0'),
                day: String(task.date.day).padStart(2, '0'),
            }
            setDefaultDateValue(date.year + '-' + date.month  + '-' + date.day);
        }
    }, [task.date])

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
        deleteTaskToList(planedTask, dispatch);
        addTaskToList(planedTask, dispatch);
    }

    


    
    return (
        <Stack direction={'row'} align={'center'}>
            <Stack>
                <Icon as={LiaCalendarSolid} boxSize={5} />
            </Stack>
            <Stack flex={'1 1 auto'}>
                <Input id='dateInput'
                    placeholder="Select Date and Time"
                    defaultValue={defaultDateValue}
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