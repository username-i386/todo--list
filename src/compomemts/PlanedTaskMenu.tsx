import { Button, Text, Icon, IconButton, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Portal, useDisclosure, Box, Stack } from "@chakra-ui/react";
import { FC, ReactElement, useState } from "react";
import { LiaCalendarSolid } from "react-icons/lia";
import { TbCalendarPlus, TbCalendarShare, TbCalendarOff, TbCalendarDue } from "react-icons/tb";
import { CreateTaskMenuItem } from "./PlanedTaskMenuItem";
import { PLANED_NEXT_WEEK, PLANED_TODAY, PLANED_TOMORROW } from "../constants/createTaskMenuItemsVariant";
import { getLocalDate } from "../utils/getLocalDate";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setPlanedToTask } from "../redux/slices/planedTask";
import { IPlanedTaskDate } from "../redux/types";
import { Calendar } from "./Calendar";



export const PlanedTaskMenu: FC = (): ReactElement => {

   const dispatch: AppDispatch = useDispatch();

   const { isOpen, onOpen } = useDisclosure();

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
   }



   return (
      <>
         <Popover isOpen>
            <PopoverTrigger>
               <Box>
                  <Icon as={LiaCalendarSolid} boxSize={5} cursor={'pointer'}  />
               </Box>
            </PopoverTrigger>
            <Portal>
               <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader textAlign={'center'}>
                     Срок
                  </PopoverHeader>
                  {
                     isOpen ?
                        <Calendar />
                     : 
                        <>
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
                              <Button variant='solid' color={'white'} 
                                 colorScheme='blue' 
                                 bg='blue.500' 
                                 w={'100%'} 
                                 h={'100%'} 
                                 p={2} 
                                 onClick={onOpen}
                              >
                                 Выбрать дату
                              </Button>
                           </PopoverFooter>
                        </>
                  }


                  
               </PopoverContent>
            </Portal>
         </Popover>
      </>
   )
}