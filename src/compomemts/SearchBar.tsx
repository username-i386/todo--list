import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteSearchList, searchTask } from "../redux/slices/searchSlice";
import { ISearchRequest } from "../redux/types";


export const SearchBar: FC = (): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    const allTasks = useSelector((state: RootState) => state.tasksSLice.allList);
    
    const [searchTitle, setSearchTitle] = useState<string>('');

    useEffect(() => {
        if (searchTitle === '') {
            dispatch(deleteSearchList());
        }
    }, [searchTitle])


    function searchTaskInList() {
        const searchRequest: ISearchRequest = {
            searchTitle,
            tasksList: allTasks,
        }
        dispatch(searchTask(searchRequest));
    }

    function handlerSearchBarKeyboard(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.code === 'Enter') {
            searchTaskInList();
        }
    }


    return (
        <InputGroup>
            <Input variant='filled' 
                bg={'white'} 
                color={'black'} 
                _hover={{ background: 'white' }} 
                value={searchTitle}
                onChange={e => setSearchTitle(e.target.value)}
                onKeyDown={e => handlerSearchBarKeyboard(e)}
            />
            <InputRightElement>
                <ImSearch color='black' 
                    cursor={'pointer'} 
                    onClick={() => searchTaskInList()}
                />
            </InputRightElement>
            
        </InputGroup>
    )
}