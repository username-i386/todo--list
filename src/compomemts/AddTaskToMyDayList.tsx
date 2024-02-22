import { Icon, Stack, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { IAddTaskToMyDayListProps } from "./types";
import { GoSun } from "react-icons/go";
import { RxCross1 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addTaskInMyDayList, removeTaskInMyDayList } from "../redux/slices/tasksSlice";


export const AddTaskToMyDayList: FC<IAddTaskToMyDayListProps> = ({ task }): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    function handlerForAddTaskToMyDayListBtn() {
        if (task.list.isMyDayList) {
            dispatch(removeTaskInMyDayList(task.id));
        } else {
            dispatch(addTaskInMyDayList(task));
        }
    }

    return (
        <Stack direction={'row'} 
            justify={'space-around'} 
            align={'center'} 
            cursor={'pointer'} 
            onClick={handlerForAddTaskToMyDayListBtn}
        >
            <Stack justify={'center'}>
                <Icon as={GoSun} w={4} />
            </Stack>
            <Stack flex={'1 1 auto'} justify={'center'}>
                <Text color={task.list.isMyDayList ? 'blue.500' : 'gray.400'}
                    _hover={task.list.isMyDayList ? { color: 'blue.500' } : { color: 'black' }}>
                    {
                        task.list.isMyDayList ? 'Добавлено в список "Мой день"' : 'Добавить в список "Мой день"'
                    }
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