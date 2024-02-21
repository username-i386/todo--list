import { Box, Icon, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setSubtask } from "../redux/slices/subtasksSlice";
import { ISubtask } from "../redux/types";
import { nanoid } from "nanoid";


export const CreateSubtask: FC = (): ReactElement => {

    const dispatch = useDispatch();

    const task = useSelector((state: RootState) => state.taskMenu.task);
    
    const [subtaskTitle, setSubtaskTitle] = useState<string>('');

    function handleKeyboardEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.code === 'Enter') {
            if (task !== undefined) {
                const subtask: ISubtask = {
                    taskId: task?.id,
                    subtaskId: nanoid(),
                    title: subtaskTitle,
                    isComplete: false,
                }
                dispatch(setSubtask(subtask));
                setSubtaskTitle('');
            }
        }
    }



    return (
        <Box px={4}>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <Icon as={FaPencilAlt} />
                </InputLeftElement>
                <Input type='text' 
                    placeholder='Добавить задачу' 
                    variant='flushed'
                    _placeholder={{ color: 'blue.600', fontWeight: 600 }}
                    value={subtaskTitle}
                    onChange={e => setSubtaskTitle(e.target.value)}
                    onKeyDown={e => handleKeyboardEnter(e)}
                />
            </InputGroup>
        </Box>
    )
}