import { Button, Text, Input, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure, Box, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { LiaCalendarSolid } from "react-icons/lia";
import { TbCalendarPlus, TbCalendarShare, TbCalendarOff, TbCalendarDue } from "react-icons/tb";
import { CreateTaskMenuItem } from "./TaskMenuItem";
import { PLANED_NEXT_WEEK, PLANED_TODAY, PLANED_TOMORROW } from "../constants/createTaskMenuItemsVariant";
import { getLocalDate } from "../utils/getLocalDate";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPlanedToTask } from "../redux/slices/planedTask";
import { IDate } from "../redux/types";
import { outputDeadline } from "../utils/outputDeadline";



export const PlanedTaskMenu: FC = (): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const planedTaskDate = useSelector((state: RootState) => state.planedTask.date);

   const [invalidInputValue, setInvalidInputValue] = useState<boolean>(false);

   function checkValidInputValue(dateInput: HTMLInputElement, datePlanedTask: IDate): void {
      /*
         !Добавить проверку, чтобы дата была не раньше, чем сегодня
      */
      if (dateInput.value !== undefined) {
         if (0 < datePlanedTask.day && datePlanedTask.day <= 31) {
            if (0 < datePlanedTask.month && datePlanedTask.month <= 12) {
               if (datePlanedTask.year >= getLocalDate().today.year) {
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
      tomorrow: getLocalDate().getFutureDate(1).dayShortName,
   }

   function handlerToPlanedTaskMenu(variant: string) {
      switch (variant) {
         case PLANED_TODAY:
            const dateToday: IDate = {
               year: +getLocalDate().today.year,
               month: +getLocalDate().today.month,
               day: +getLocalDate().today.day,
            }
            dispatch(setPlanedToTask(dateToday));
            break;
         case PLANED_TOMORROW:
            dispatch(setPlanedToTask(getLocalDate().getFutureDate(1)));
            break;
         case PLANED_NEXT_WEEK:
            dispatch(setPlanedToTask(getLocalDate().getFutureDate(getLocalDate().daysUntilMonday())));
            break;
      }
      onClose();
   }

   function handlerDateInput() {
      const dateInput = document.querySelector('#dateInput') as HTMLInputElement;
      
      const datePlanedTask: IDate = {
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

   function handlerDateBtn(): void {
      dispatch(setPlanedToTask(undefined));
      onClose();
   }

   

   return (
      <>
         <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={true}>
            <PopoverTrigger>
               <Stack align={'center'} justify={'center'}>
                  {
                     (planedTaskDate === undefined || (!planedTaskDate?.day && !planedTaskDate.month && !planedTaskDate.year)) ?
                        <Box>
                           <Icon as={LiaCalendarSolid} boxSize={5} cursor={'pointer'} onClick={onOpen} />
                        </Box>
                        :
                        <Stack direction={'row'} align={'center'} gap={2}
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
               </Stack>
            </PopoverTrigger>
            <Portal>
               <PopoverContent w={'auto'}>
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
                     <Stack direction={'column'} spacing={2}>
                        <Box>
                           <Text mb={2}>Выбор даты:</Text>
                           <Input id='dateInput'
                              isInvalid={invalidInputValue}
                              placeholder="Select Date and Time"
                              size="md"
                              type="date"
                              mb={2} />
                        </Box>
                        <Button bg={'blue.500'}
                           color={'white'}
                           colorScheme='blue'
                           w={'100%'}
                           onClick={handlerDateInput}
                        >
                           Cохранить
                        </Button>
                        {
                           planedTaskDate ? 
                              <Button bg={'red.500'}
                                 color={'white'}
                                 colorScheme='red'
                                 w={'100%'}
                                 onClick={handlerDateBtn}
                              >
                                 Удалить дату
                              </Button>
                           : <></>
                        }
                     </Stack>
                  </PopoverFooter>
                  {/* <PopoverFooter p={2}>
                     <Button bg={'red.500'}
                        color={'white'}
                        colorScheme='red'
                        w={'100%'}
                        onClick={handlerDateBtn}
                     >
                        Удалить дату
                     </Button>
                  </PopoverFooter> */}
               </PopoverContent>
            </Portal>
         </Popover>
      </>
   )
}