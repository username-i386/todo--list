import { Stack, Icon, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { PiRepeatLight } from "react-icons/pi";
import { outputRepeatVariant } from "../utils/outputRepeatVariant";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { IRepeatTriggerProps } from "./types";



export const RepeatTriggerForNewTask: FC<IRepeatTriggerProps> = ({ onOpen }): ReactElement => {

    const repeatTask = useSelector((state: RootState) => state.repeatTask.repeatTask);

    if (!repeatTask.isRepeat) {
        return (
            <Stack align={'center'}>
                <Icon as={PiRepeatLight} boxSize={5} cursor={'pointer'} onClick={onOpen} />
            </Stack>
        )
    } else {
        return (
            <Stack direction={'row'} align={'center'} gap={2}
                cursor={'pointer'}
                px={2}
                rounded={'50px'}
                border={'1px solid'}
                borderColor={'gray.400'}
                onClick={onOpen}
            >
                <Icon as={PiRepeatLight} boxSize={5} />
                <Text fontSize={'xs'}>
                    {
                        outputRepeatVariant(repeatTask.repeatVariant)
                    }
                </Text>
            </Stack>
        )
    }
}