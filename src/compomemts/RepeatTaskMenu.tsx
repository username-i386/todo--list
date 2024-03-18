import { Button, 
   Popover, 
   PopoverArrow, 
   PopoverBody, 
   PopoverContent, 
   PopoverFooter, 
   PopoverHeader, 
   PopoverTrigger, 
   Portal, 
   useDisclosure, 
   Stack } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { CreateTaskMenuItem } from "./TaskMenuItem";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRepeatTaskMenuProps } from "./types";
import { deleteRepeat } from "../utils/deleteRepeat";
import { RepeatTriggerForNewTask } from "./RepeatTriggerForNewTask";
import { RepeatTriggerForCurrentTask } from "./RepeatTriggerForCurrentTask";



export const RepeatTaskMenu: FC<IRepeatTaskMenuProps> = ({ 
   taskMenuItems, 
   task, 
   handlerMenuItem, 
   isNewTask
}): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const repeatTask = useSelector((state: RootState) => state.repeatTask.repeatTask);

   const { isOpen, onOpen, onClose } = useDisclosure();


   return (
      <>
         <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={true} >
            <PopoverTrigger>
               <Stack align={'center'} justify={'center'}>
                  {
                     isNewTask ? <RepeatTriggerForNewTask onOpen={onOpen} />
                        : <RepeatTriggerForCurrentTask onOpen={onOpen} />
                  }
               </Stack>
            </PopoverTrigger>
            <PopoverContent w={'auto'}>
               <PopoverArrow />
               <PopoverHeader textAlign={'center'}>
                  Повтор
               </PopoverHeader>
                  <PopoverBody p={0}>
                     <Stack direction={'column'} gap={0}>
                        {
                           taskMenuItems.map((taskMenuItem, index): ReactElement => {
                              return (
                                 <CreateTaskMenuItem key={index}
                                    icon={taskMenuItem.icon}
                                    title={taskMenuItem.title}
                                    dayShortName={taskMenuItem.dayShortName}
                                    variant={taskMenuItem.variant}
                                    task={task}
                                    onClose={onClose}
                                    handlerMenuItem={handlerMenuItem} />
                              )
                           })
                        }
                     </Stack>
                  </PopoverBody>
                  {
                     repeatTask.isRepeat ?
                        <PopoverFooter p={2}>
                           <Button bg={'red.500'}
                              color={'white'}
                              colorScheme='red'
                              w={'100%'}
                              onClick={() => deleteRepeat(dispatch, onClose)}
                           >
                              Удалить дату
                           </Button>
                        </PopoverFooter>
                     : <></>
                  }
            </PopoverContent>
         </Popover>
      </>
   )
}