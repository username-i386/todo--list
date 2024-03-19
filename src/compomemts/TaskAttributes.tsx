import { Stack, Icon, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { GoSun } from "react-icons/go";
import { LiaCalendarSolid } from "react-icons/lia";
import { PiRepeatLight } from "react-icons/pi";
import { outputDate } from "../utils/outputDeadline";
import { outputRepeatVariant } from "../utils/outputRepeatVariant";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { CgNotes } from "react-icons/cg";
import { ITaskAttributeProps } from "./types";
import { isExpiredDate } from "../utils/checkIsExpiredDate";


export const TaskAttribute: FC<ITaskAttributeProps> = ({ task }): ReactElement => {

    const notes = useSelector((state: RootState) => state.notes.notes);
    const doTaskHaveNote = (): boolean => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].taskId === task.id) {
                return true;
            }
        }
        return false;
    }

    return (
        <Stack direction={'row'} align={'center'} wrap={'wrap'} pt={1}>
            {
                (task.list.isMyDayList) ?
                    <Stack direction={'row'} align={'center'}>
                        <Icon as={GoSun} boxSize={3} />
                        <Text fontSize={'xs'}>Мой день</Text>
                    </Stack>
                : <></>
            }
            {
                (task.planedDate?.day && task.planedDate.month && task.planedDate.year) ?
                    <Stack direction={'row'} align={'center'} gap={2}>
                        <Icon as={LiaCalendarSolid} boxSize={4} />
                        <Text fontSize={'xs'} 
                            color={isExpiredDate(task.planedDate) ? 'tomato' : ''}
                        >
                            {
                                outputDate(task.planedDate, false)
                            }
                        </Text>
                    </Stack>
                : <></>
            }
            {
                (task.repeat.isRepeat) ? 
                    <Stack direction={'row'} align={'center'} gap={2}>
                        <Icon as={PiRepeatLight} boxSize={4} />
                        <Text fontSize={'xs'}>
                            {
                                outputRepeatVariant(task.repeat.repeatVariant)
                            }
                        </Text>
                    </Stack>
                : <></>
            }
            {
                (doTaskHaveNote()) ?
                    <Stack direction={'row'} align={'center'} gap={2}>
                        <Icon as={CgNotes} boxSize={4} />
                        <Text fontSize={'xs'}>
                            Заметка
                        </Text>
                    </Stack>
                : <></>
            }
        </Stack>
    )
}