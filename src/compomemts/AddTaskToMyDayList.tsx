import { Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { IAddTaskToMyDayListProps } from "./types";
import { GoSun } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { addTaskInMyDayList, addTaskInTasksList, removeTaskInMyDayList } from "../redux/slices/tasksSlice";
import { checkIsTaskInList } from "../utils/checkIsTaskInList";
import { ADD_TASK_TO_MY_DAY_LIST, DELETE_TASK_TO_MY_DAY_LIST } from "../constants/addTaskToMyDayListTitle";
import { ITask } from "../redux/types";
import { getLocalDate } from "../utils/getLocalDate";


export const AddTaskToMyDayList: FC<IAddTaskToMyDayListProps> = ({ task }): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    const taskLists = useSelector((state: RootState) => state.tasksSLice);

    const titleInitValue: string = task.list.isMyDayList ? DELETE_TASK_TO_MY_DAY_LIST : ADD_TASK_TO_MY_DAY_LIST;
    const [title, setTitle] = useState<string>(titleInitValue);

    useEffect(() => {
        if (checkIsTaskInList(taskLists.myDayList, task)) {
            setTitle(DELETE_TASK_TO_MY_DAY_LIST);
        } else {
            setTitle(ADD_TASK_TO_MY_DAY_LIST);
        }
    }, [taskLists])

    const textColor = useColorModeValue('gray.700', 'gray.300');
    const hoverTextColor = useColorModeValue('black', 'white');

    const updatedTask = (task: ITask): ITask => {
        return {
            ...task,
            createdDate: {
                year: getLocalDate().today.year,
                month: getLocalDate().today.month,
                day: getLocalDate().today.day,
            },
        }
    }

    function handlerForAddTaskToMyDayListBtn() {
        if (checkIsTaskInList(taskLists.myDayList, task)) {
            dispatch(removeTaskInMyDayList(task.id));
            if (!checkIsTaskInList(taskLists.tasksList, task)) {
                dispatch(addTaskInTasksList(task));
            }
        } else {
            dispatch(addTaskInMyDayList(updatedTask(task)));
        }
    }

    return (
        <Stack direction={'row'} 
            justify={'space-around'} 
            align={'center'} 
            cursor={'pointer'} 
            color={task.list.isMyDayList ? 'blue.500' : textColor}
            _hover={task.list.isMyDayList ? { color: 'blue.600' } : { color: hoverTextColor }}
            onClick={handlerForAddTaskToMyDayListBtn}
        >
            <Stack justify={'center'}>
                <Icon as={GoSun} w={4} />
            </Stack>
            <Stack flex={'1 1 auto'} justify={'center'}>
                <Text>
                    {title}
                </Text>
            </Stack>
            {
                task.list.isMyDayList ?
                    <Stack justify={'center'}>
                        <Icon as={RxCross1} w={4} />
                    </Stack>
                :<></>
            }
        </Stack>
    )
}