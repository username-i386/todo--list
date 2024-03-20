import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { deleteSubtask } from "../redux/slices/subtasksSlice";
import { IConfirmDeletionModalProps } from "./types";
import { deleteTaskToList } from "../utils/deleteTaskToList";
import { toggleTaskMenu } from "../redux/slices/taskMenuSlice";


export const ConfirmDeletionModal: FC<IConfirmDeletionModalProps> = ({ isOpen, onClose, subtask, task }): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    if (!task && !subtask) return <></>
    

    function handlerDeleteBtn() {
        if (subtask) {
            dispatch(deleteSubtask(subtask.subtaskId));
        }

        if (task) {
            deleteTaskToList(task, dispatch);
            dispatch(toggleTaskMenu({
                isOpen: false,
                task: undefined,
            }))
        }
        
        onClose();
    }

    const title = (): string => {
        if (task) {
            return task.title
        } else if (subtask) {
            return subtask?.title
        } else {
            return '';
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {
                        'Элемент "' + title() + '" будет удален без возможности востановления.'
                    }
                </ModalHeader>

                <ModalCloseButton />

                <ModalBody>
                    Вы не сможете отменить это действие
                </ModalBody>

                <ModalFooter>
                    <Button variant={'ghost'} colorScheme='blue' mr={3} onClick={onClose}>
                        Отмена
                    </Button>
                    <Button colorScheme='red' bg={'tomato'} color={'white'} onClick={handlerDeleteBtn}>
                        Удалить
                    </Button>
                </ModalFooter>
            </ModalContent>
    </Modal>
    )
}
