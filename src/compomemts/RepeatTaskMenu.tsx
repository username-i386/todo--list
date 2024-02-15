import { Button, Text, Input, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure, Box, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { LiaCalendarSolid } from "react-icons/lia";
import { TbCalendarPlus, TbCalendarShare, TbCalendarOff, TbCalendarDue } from "react-icons/tb";
import { CreateTaskMenuItem } from "./TaskMenuItem";
import { PLANED_NEXT_WEEK, PLANED_TODAY, PLANED_TOMORROW, REPEAT_DAILY, REPEAT_MONTHLY, REPEAT_WEEKLY, REPEAT_WORK_DAY, REPEAT_YEARLY } from "../constants/createTaskMenuItemsVariant";
import { getLocalDate } from "../utils/getLocalDate";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPlanedToTask } from "../redux/slices/planedTask";
import { IDate, IRepeatTask } from "../redux/types";
import { outputDeadline } from "../utils/outputDeadline";
import { PiRepeatLight } from "react-icons/pi";
import { setRepeatToTask } from "../redux/slices/repeatTask";
import { outputRepeatVariant } from "../utils/outputRepeatVariant";



export const RepeatTaskMenu: FC = (): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const { isOpen, onOpen, onClose } = useDisclosure();

   const repeatTask = useSelector((state: RootState) => state.repeatTask.repeatTask);



   function handlerToRepeatTaskMenu(variant: string) {
      switch (variant) {
         case REPEAT_DAILY:
            const dailyRepeatTask: IRepeatTask = {
               isRepeat: true,
               repeatVariant: REPEAT_DAILY,
               nextDateRepeat: getLocalDate().getFutureDate(1),
            }
            dispatch(setRepeatToTask(dailyRepeatTask));
            break;
         case REPEAT_MONTHLY:
            const monthlyRepeatTask: IRepeatTask = {
               isRepeat: true,
               repeatVariant: REPEAT_MONTHLY,
               nextDateRepeat: getLocalDate().getFutureDate(30),
            }
            dispatch(setRepeatToTask(monthlyRepeatTask));
            break;
         case REPEAT_WEEKLY:
            const weeklyRepeatTask: IRepeatTask = {
               isRepeat: true,
               repeatVariant: REPEAT_WEEKLY,
               nextDateRepeat: getLocalDate().getFutureDate(7),
            }
            dispatch(setRepeatToTask(weeklyRepeatTask));
            break;
         case REPEAT_YEARLY:
            const yearlyRepeatTask: IRepeatTask = {
               isRepeat: true,
               repeatVariant: REPEAT_YEARLY,
               nextDateRepeat: getLocalDate().getFutureDate(365),
            }
            dispatch(setRepeatToTask(yearlyRepeatTask));
            break;
         case REPEAT_WORK_DAY:
            let nextWorkDay;
            for (let i = 1; true; i++) {
               if (getLocalDate().isWorkDayTomorrow()) {
                  nextWorkDay = getLocalDate().getFutureDate(i);
                  break;
               }
               
            }
            const workDayRepeatTask: IRepeatTask = {
               isRepeat: true,
               repeatVariant: REPEAT_WORK_DAY,
               nextDateRepeat: nextWorkDay,
            }
            dispatch(setRepeatToTask(workDayRepeatTask));
            break;
      }
      onClose();
   }



   

   return (
      <>
         <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={true} >
            <PopoverTrigger>
               <Stack align={'center'} justify={'center'}>
                  {
                     (!repeatTask.isRepeat) ?
                        <Stack align={'center'}>
                           <Icon as={PiRepeatLight} boxSize={5} cursor={'pointer'} onClick={onOpen} />
                        </Stack>
                        :
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
                  }
               </Stack>
            </PopoverTrigger>
            <Portal>
               <PopoverContent w={'auto'}>
                  <PopoverArrow />
                  <PopoverHeader textAlign={'center'}>
                     Повтор
                  </PopoverHeader>
                     <PopoverBody p={0}>
                        <Stack direction={'column'} gap={0}>
                           <CreateTaskMenuItem icon={TbCalendarDue}
                              title='Ежедневно'
                              dayShortName={''}
                              variant={REPEAT_DAILY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={TbCalendarPlus}
                              title='Рабочие дни'
                              dayShortName={''}
                              variant={REPEAT_WORK_DAY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={TbCalendarShare}
                              title='Еженедельно'
                              dayShortName={''}
                              variant={REPEAT_WEEKLY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={TbCalendarPlus}
                              title='Ежемесячно'
                              dayShortName={''}
                              variant={REPEAT_MONTHLY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={TbCalendarShare}
                              title='Ежегодно'
                              dayShortName={''}
                              variant={REPEAT_YEARLY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                        </Stack>
                     </PopoverBody>

                     {/* <PopoverFooter p={2}>
                        <Text mb={2}>Выбор даты:</Text>
                        <Input id='dateInput'
                           isInvalid={invalidInputValue}
                           placeholder="Select Date and Time"
                           size="md"
                           type="date"
                           mb={2} />
                        <Button bg={'blue.500'}
                           color={'white'}
                           colorScheme='blue'
                           w={'100%'}
                           onClick={handlerDateInput}
                        >
                           Cохранить
                           </Button>
                     </PopoverFooter> */}
               </PopoverContent>
            </Portal>
         </Popover>
      </>
   )
}