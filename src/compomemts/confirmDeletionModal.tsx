import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { ISubtask } from "../redux/types";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { deleteSubtask } from "../redux/slices/subtasksSlice";
import { IConfirmDeletionModalProps } from "./types";


export const ConfirmDeletionModal: FC<IConfirmDeletionModalProps> = ({ isOpen, onClose, subtask }): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    function handlerDeleteSubtaskBtn() {
        dispatch(deleteSubtask(subtask.subtaskId))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {
                        'Элемент "' + subtask.title + '" будет удален без возможности востановления.'
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
                    <Button colorScheme='red' bg={'tomato'} color={'white'} onClick={handlerDeleteSubtaskBtn}>
                        Удалить
                    </Button>
                </ModalFooter>
            </ModalContent>
    </Modal>
    )
}