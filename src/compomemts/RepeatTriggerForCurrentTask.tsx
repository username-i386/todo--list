import { Icon, Stack, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { PiRepeatLight } from "react-icons/pi";
import { IRepeatTriggerProps } from "./types";


export const RepeatTriggerForCurrentTask: FC<IRepeatTriggerProps> = ({ onOpen }): ReactElement => {
    return (
        <Stack direction={'row'} align={'center'} justify={'center'} w={'100%'} onClick={onOpen}> 
            <Icon as={PiRepeatLight} boxSize={5} cursor={'pointer'} />
            <Text>Повтор</Text>
        </Stack>
    )
}