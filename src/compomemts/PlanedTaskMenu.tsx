import { Button, Text, Input, Icon, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure, Box, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { LiaCalendarSolid } from "react-icons/lia";
import { TbCalendarPlus, TbCalendarShare, TbCalendarDue } from "react-icons/tb";
import { CreateTaskMenuItem } from "./TaskMenuItem";
import { PLANED_NEXT_WEEK, PLANED_TODAY, PLANED_TOMORROW } from "../constants/createTaskMenuItemsVariant";
import { getLocalDate } from "../utils/getLocalDate";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPlanedToTask } from "../redux/slices/planedTaskSlice";
import { IDate } from "../redux/types";
import { outputDate } from "../utils/outputDeadline";
import { checkValidInputValue } from "../utils/checkValidInputValue";



export const PlanedTaskMenu: FC = (): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const planedTaskDate = useSelector((state: RootState) => state.planedTask.date);

   const [invalidInputValue, setInvalidInputValue] = useState<boolean>(false);

   function setInvalidInput(dateInput: HTMLInputElement, datePlanedTask: IDate): void {
      if (checkValidInputValue(datePlanedTask)) {
         setInvalidInputValue(true);
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
            const tomorrowDate: IDate = getLocalDate().getFutureDate(1);
            dispatch(setPlanedToTask(tomorrowDate));
            break;
         case PLANED_NEXT_WEEK:
            const amountDaysUntilMonday: number = getLocalDate().daysUntilMonday();
            const nextMondayDate: IDate = getLocalDate().getFutureDate(amountDaysUntilMonday);
            dispatch(setPlanedToTask(nextMondayDate));
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

      setInvalidInput(dateInput, datePlanedTask);

      if (datePlanedTask.day && datePlanedTask.month && datePlanedTask.year) {
         if (checkValidInputValue(datePlanedTask)) {
            dispatch(setPlanedToTask(datePlanedTask));
            onClose();
         }
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
                        <Stack align={'center'}>
                           <Icon as={LiaCalendarSolid} boxSize={5} cursor={'pointer'} onClick={onOpen} />
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
                           <Icon as={LiaCalendarSolid} boxSize={5} />
                           <Text fontSize={'xs'}>
                              {
                                 outputDate(planedTaskDate, false)
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
                           handlerMenuItem={handlerToPlanedTaskMenu}
                           onClose={onClose} />
                        <CreateTaskMenuItem icon={TbCalendarPlus}
                           title='завтра'
                           dayShortName={deadlineDate.tomorrow}
                           variant={PLANED_TOMORROW}
                           handlerMenuItem={handlerToPlanedTaskMenu}
                           onClose={onClose} />
                        <CreateTaskMenuItem icon={TbCalendarShare}
                           title='с понедельника начну'
                           dayShortName={'пн'}
                           variant={PLANED_NEXT_WEEK}
                           handlerMenuItem={handlerToPlanedTaskMenu}
                           onClose={onClose} />
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
               </PopoverContent>
            </Portal>
         </Popover>
      </>
   )
}