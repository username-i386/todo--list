import { Icon, IconButton, Input, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { IAddPlanedDateToTaskProps } from "./types";
import { LiaCalendarSolid } from "react-icons/lia";
import { IDate, ITask } from "../redux/types";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { addTaskToList } from "../utils/addTaskToList";
import { deleteTaskToList } from "../utils/deleteTaskToList";
import { updateTaskInSettingsBar } from "../utils/updateTaskInSettingsBar";
import { BiSave } from "react-icons/bi";
import { checkValidInputValue } from "../utils/checkValidInputValue";


export const AddPlanedDateToTask: FC<IAddPlanedDateToTaskProps> = ({ task }): ReactElement => {
    
    const dispatch: AppDispatch = useDispatch();

    const [defaultDateValue, setDefaultDateValue] = useState('');
    const [datePlanedTask, setDatePlanedTask] = useState<IDate | undefined>(undefined);

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
        if (checkValidInputValue(datePlanedTask)) {
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
    }

    function changePlanedDate(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;

        setDatePlanedTask({
            year: +target.value.split('-')[0],
            month: +target.value.split('-')[1],
            day: +target.value.split('-')[2],
        });
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
                    type="date"
                    onChange={e => changePlanedDate(e)} />
            </Stack>
            <Stack>
                <IconButton 
                    bg={'blue.500'} 
                    color={'white'}
                    colorScheme='blue'
                    aria-label='Save date'
                    icon={<BiSave />}
                    onClick={addPlanedDateToTask} />
            </Stack>
        </Stack>
    )
}