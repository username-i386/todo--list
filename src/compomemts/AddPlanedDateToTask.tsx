import { Button, Icon, Input, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { IAddPlanedDateToTaskProps } from "./types";
import { LiaCalendarSolid } from "react-icons/lia";
import { IDate, ITask } from "../redux/types";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { addTaskToList } from "../utils/addTaskToList";
import { deleteTaskToList } from "../utils/deleteTaskToList";
import { toggleTaskMenu } from "../redux/slices/taskMenuSlice";
import { updateTaskInSettingsBar } from "../utils/updateTaskInSettingsBar";


export const AddPlanedDateToTask: FC<IAddPlanedDateToTaskProps> = ({ task }): ReactElement => {
    
    const dispatch: AppDispatch = useDispatch();

    const [defaultDateValue, setDefaultDateValue] = useState('');

    useEffect(() => {
        if (task.planedDate) {
            const date = {
                year: String(task.planedDate.year),
                month: String(task.planedDate.month).padStart(2, '0'),
                day: String(task.planedDate.day).padStart(2, '0'),
            }
            setDefaultDateValue(date.year + '-' + date.month  + '-' + date.day);
        }
    }, [task.planedDate])

    function addPlanedDateToTask() {
        const dateInput = document.querySelector('#dateInput') as HTMLInputElement;
        const datePlanedTask: IDate = {
            year: +dateInput.value.split('-')[0],
            month: +dateInput.value.split('-')[1],
            day: +dateInput.value.split('-')[2],
        }
        const updatedTask: ITask = {
            ...task,
            planedDate: datePlanedTask,
            list: {
                ...task.list,
                isPlanedList: true,
            },
        }
        deleteTaskToList(updatedTask, dispatch);
        addTaskToList(updatedTask, dispatch);
        updateTaskInSettingsBar(dispatch, updatedTask);
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