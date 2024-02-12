import { Button, Text, Input, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure, Box, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { LiaCalendarSolid } from "react-icons/lia";
import { TbCalendarPlus, TbCalendarShare, TbCalendarOff, TbCalendarDue } from "react-icons/tb";
import { CreateTaskMenuItem } from "./PlanedTaskMenuItem";
import { PLANED_NEXT_WEEK, PLANED_TODAY, PLANED_TOMORROW } from "../constants/createTaskMenuItemsVariant";
import { getLocalDate } from "../utils/getLocalDate";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPlanedToTask } from "../redux/slices/planedTask";
import { IPlanedTaskDate } from "../redux/types";
import { outputDeadline } from "../utils/outputDeadline";



export const PlanedTaskMenu: FC = (): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const planedTaskDate = useSelector((state: RootState) => state.planedTask.date);
   console.log(planedTaskDate);

   const [invalidInputValue, setInvalidInputValue] = useState<boolean>(false);

   function checkValidInputValue(dateInput: HTMLInputElement, datePlanedTask: IPlanedTaskDate): void {
      /*
         !Добавить проверку, чтобы дата была не раньше, чем сегодня
      */
      if (dateInput.value !== undefined) {
         if (0 < datePlanedTask.day && datePlanedTask.day <= 31) {
            if (0 < datePlanedTask.month && datePlanedTask.month <= 12) {
               if (datePlanedTask.year >= getLocalDate().year) {
                  setInvalidInputValue(false);
               }
            }
         } else {
            setInvalidInputValue(true);
         }
      } else {
         setInvalidInputValue(false);
      }
   }
   
   const { isOpen, onOpen, onClose } = useDisclosure();

   const deadlineDate = {
      today: getLocalDate().dayShortName(),
      tomorrow: getLocalDate(getLocalDate().dayNumberInWeek + 1).dayShortName(),
   }

   function handlerToPlanedTaskMenu(variant: string) {
      switch (variant) {
         case PLANED_TODAY:
            const dateToday: IPlanedTaskDate = {
               year: +getLocalDate().year,
               month: +getLocalDate().month,
               day: +getLocalDate().day,
            }
            dispatch(setPlanedToTask(dateToday));
            break;
         case PLANED_TOMORROW:
            const dateTomorrow: IPlanedTaskDate = {
               year: +getLocalDate().year,
               month: +getLocalDate().month,
               day: +getLocalDate().day + 1,
            }
            dispatch(setPlanedToTask(dateTomorrow));
            break;
         case PLANED_NEXT_WEEK:
            const dateNextWeek: IPlanedTaskDate = {
               year: +getLocalDate().year,
               month: +getLocalDate().month,
               day: +getLocalDate().day + getLocalDate().daysUntilMonday(),
            }
            dispatch(setPlanedToTask(dateNextWeek));
            break;
      }
      onClose();
   }

   function handlerDateInput() {
      const dateInput = document.querySelector('#dateInput') as HTMLInputElement
      
      const datePlanedTask: IPlanedTaskDate = {
         year: +dateInput.value.split('-')[0],
         month: +dateInput.value.split('-')[1],
         day: +dateInput.value.split('-')[2],
      }

      checkValidInputValue(dateInput, datePlanedTask);

      if (datePlanedTask.day && datePlanedTask.month && datePlanedTask.year) {
         dispatch(setPlanedToTask(datePlanedTask));
         onClose();
      }
   }

   

   return (
      <>
         <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={true}>
            <PopoverTrigger>
               {
                  (planedTaskDate === undefined || (!planedTaskDate?.day && !planedTaskDate.month && !planedTaskDate.year)) ?
                     <Box>
                        <Icon as={LiaCalendarSolid} boxSize={5} cursor={'pointer'} onClick={onOpen} />
                     </Box>
                     :
                     <Stack direction={'row'} gap={2}
                        cursor={'pointer'}
                        px={2}
                        rounded={'50px'}
                        border={'1px solid'}
                        borderColor={'gray.400'}
                        onClick={onOpen}
                     >
                        <Icon as={LiaCalendarSolid} boxSize={5} />
                        <Text fontSize={'xs'}>
                           {
                              outputDeadline(planedTaskDate)
                           }
                        </Text>
                     </Stack>
               }
            </PopoverTrigger>
            <Portal>
               <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader textAlign={'center'}>
                     {
                        (planedTaskDate?.day && planedTaskDate.month && planedTaskDate.year) ? 
                           `Срок: ${planedTaskDate.day}.${planedTaskDate.month}.${planedTaskDate.year}` 
                        : 'Срок'
                     }
                  </PopoverHeader>
                     <PopoverBody p={0}>
                        <Stack direction={'column'} gap={0}>
                           <CreateTaskMenuItem icon={TbCalendarDue}
                              title='сегодня'
                              dayShortName={deadlineDate.today}
                              variant={PLANED_TODAY}
                              handlerMenuItem={handlerToPlanedTaskMenu} />
                           <CreateTaskMenuItem icon={TbCalendarPlus}
                              title='завтра'
                              dayShortName={deadlineDate.tomorrow}
                              variant={PLANED_TOMORROW}
                              handlerMenuItem={handlerToPlanedTaskMenu} />
                           <CreateTaskMenuItem icon={TbCalendarShare}
                              title='с понедельника начну'
                              dayShortName={'пн'}
                              variant={PLANED_NEXT_WEEK}
                              handlerMenuItem={handlerToPlanedTaskMenu} />
                        </Stack>
                     </PopoverBody>

                     <PopoverFooter p={2}>
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
                     </PopoverFooter>
               </PopoverContent>
            </Portal>
         </Popover>
      </>
   )
}