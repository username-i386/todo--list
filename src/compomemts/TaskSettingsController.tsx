import { Icon, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { BsBoxArrowInRight } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ITaskSettingsControllerProps } from "./types";
import { outputDate } from "../utils/outputDeadline";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { toggleTaskMenu } from "../redux/slices/taskMenuSlice";
import { deleteTaskToList } from "../utils/deleteTaskToList";
import { ConfirmDeletionModal } from "./ConfirmDeletionModal";


export const TaskSettingsController: FC<ITaskSettingsControllerProps> = ({ task }): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure();

    function closeTaskSettings() {
        dispatch(toggleTaskMenu({
            isOpen: false,
            task: undefined,
        }));
    }

    return (
        <>
            <Stack direction={'row'} justify={'space-between'}>
                <Stack cursor={'pointer'} onClick={closeTaskSettings}>
                    <Icon as={BsBoxArrowInRight} boxSize={6} />
                </Stack>
                <Stack>
                    <Text>
                        {outputDate(task.createdDate, true)}
                    </Text>
                </Stack>
                <Stack cursor={'pointer'} onClick={onOpen}>
                    <Icon as={RiDeleteBin6Line} boxSize={6} />
                </Stack>
            </Stack>

            <ConfirmDeletionModal isOpen={isOpen} onClose={onClose} task={task} />
        </>
    )
}