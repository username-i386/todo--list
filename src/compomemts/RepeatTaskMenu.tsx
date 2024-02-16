import { Button, Text,  Icon, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure, Stack } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { CreateTaskMenuItem } from "./TaskMenuItem";
import { REPEAT_DAILY, REPEAT_MONTHLY, REPEAT_WEEKLY, REPEAT_WORK_DAY, REPEAT_YEARLY } from "../constants/createTaskMenuItemsVariant";
import { getLocalDate } from "../utils/getLocalDate";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IRepeatTask } from "../redux/types";
import { PiRepeatLight } from "react-icons/pi";
import { setRepeatToTask } from "../redux/slices/repeatTask";
import { outputRepeatVariant } from "../utils/outputRepeatVariant";
import { BsCalendar3, BsCalendar3Week, BsCalendar2Range, BsCalendar4Event, BsCalendar4 } from "react-icons/bs";



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

   function deleteRepeat() {
      dispatch(setRepeatToTask({
         isRepeat: false,
         nextDateRepeat: undefined,
         repeatVariant: '',
      }))
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
                           <CreateTaskMenuItem icon={BsCalendar3}
                              title='Ежедневно'
                              dayShortName={''}
                              variant={REPEAT_DAILY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={BsCalendar3Week}
                              title='Рабочие дни'
                              dayShortName={''}
                              variant={REPEAT_WORK_DAY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={BsCalendar2Range}
                              title='Еженедельно'
                              dayShortName={''}
                              variant={REPEAT_WEEKLY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={BsCalendar4Event}
                              title='Ежемесячно'
                              dayShortName={''}
                              variant={REPEAT_MONTHLY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                           <CreateTaskMenuItem icon={BsCalendar4}
                              title='Ежегодно'
                              dayShortName={''}
                              variant={REPEAT_YEARLY}
                              handlerMenuItem={handlerToRepeatTaskMenu} />
                        </Stack>
                     </PopoverBody>
                     { 
                        repeatTask.isRepeat ?
                           <PopoverFooter p={2}>
                              <Button bg={'red.500'}
                                 color={'white'}
                                 colorScheme='red'
                                 w={'100%'}
                                 onClick={deleteRepeat}
                              >
                                 Удалить дату
                              </Button>
                           </PopoverFooter>
                        : <></>
                     }
               </PopoverContent>
            </Portal>
         </Popover>
      </>
   )
}