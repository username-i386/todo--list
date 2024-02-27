import { Button, Stack, Text, Textarea } from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { ITaskNoteProps } from "./types";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { INote } from "../redux/types";
import { nanoid } from "nanoid";
import { addNote, deleteNote } from "../redux/slices/notesSlice";


export const TaskNote: FC<ITaskNoteProps> = ({ task }): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    const notes = useSelector((state: RootState) => state.notes.notes);

    const currentNote = (): INote | undefined => {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].taskId === task.id) {
                return notes[i];
            }
        }
        return;
    }

    const [noteTitle, setNoteTitle] = useState('');
    
    function handlerSaveNoteBtn() {
        const note: INote = {
            noteId: nanoid(),
            taskId: task.id,
            title: noteTitle,
        }
        
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].taskId === task.id) {
                dispatch(deleteNote(note));
                break;
            }
        }

        dispatch(addNote(note));
        setNoteTitle('');
    }

    function changeTextArea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const textAreaValue: string = event.target.value;
        setNoteTitle(textAreaValue);
    }

    return (
        <Stack>
            <Text>
                Заметка: {currentNote()?.title}
            </Text>
            <Textarea
                placeholder='Добавьте заметку...'
                size='sm'   
                resize={'vertical'}
                value={noteTitle}
                onChange={e => {
                    changeTextArea(e)
                }}
            />
            <Stack direction={'row'} w={'100%'}>
                <Button colorScheme={'red'} 
                    bg={'tomato'} 
                    color={'white'} 
                    w={'100%'}
                    onClick={() => setNoteTitle('')}
                >
                    Очистить
                </Button>
                <Button colorScheme={'blue'} 
                    bg={'blue.500'} 
                    color={'white'} 
                    w={'100%'}
                    onClick={handlerSaveNoteBtn}
                >
                    Сохранить
                </Button>
            </Stack>
            </Stack>
    )
}