import { Box, Button, Icon, Stack, useDisclosure } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { FaCheck } from "react-icons/fa";
import { ISubtask } from "../redux/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { deleteSubtask, toggleCompleteSubTask } from "../redux/slices/subtasksSlice";
import { ISubtaskListItemProps } from "./types";
import { ConfirmDeletionModal } from "./confirmDeletionModal";


export const SubtaskListItem: FC<ISubtaskListItemProps> = ({ subtask }): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();

    function handleCheckbox(): void {
        dispatch(toggleCompleteSubTask(subtask.subtaskId));
    }



    return (
        <>
            <Stack direction={'row'} justify={'space-between'} align={'center'} wordBreak={'break-all'}>
                <Stack justify={'center'}
                    align={'center'}
                    rounded={'full'}
                    border={'1px solid tomato'}
                    boxSize={4}
                    minW={4}
                    cursor={'pointer'}
                    onClick={handleCheckbox}
                >
                <Icon as={FaCheck}
                    w={2} 
                    minW={2} 
                    color={subtask.isComplete ? 'tomato' : 'transparent'} 
                    _hover={{ color: 'tomato' }} /> 
                </Stack>

                <Box textDecoration={subtask.isComplete ? 'line-through' : ''} flex={'1 1 auto'}>
                    {subtask.title}
                </Box>

                <Box>
                    <Button colorScheme='red' bg={'tomato'} color={'white'} onClick={onOpen}>
                        Удалить
                    </Button>
                </Box>
            </Stack>

            <ConfirmDeletionModal isOpen={isOpen} onClose={onClose} subtask={subtask} />
        </>
    )
}