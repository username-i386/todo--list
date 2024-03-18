import { Box, Icon, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { FC, ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GoSun } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { LiaCalendarSolid } from "react-icons/lia";
import { PiInfinityThin } from "react-icons/pi";
import { PiHouse } from "react-icons/pi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ToggleMenuIcon } from "./ToggleMenuIcon";
import { WIDTH_1150_PX } from "../constants/windowWidth";

export const NavBar: FC = (): ReactElement => {

   const isMenuOpen = useSelector((state: RootState) => state.menuSlice.isMenuOpen);
   const tasks = useSelector((state: RootState) => state.tasksSLice);

   const [selectedNavItem, setSelectedNavItem] = useState(0);

   function handlerNavItems(event: React.MouseEvent<HTMLAnchorElement>) {
      const navItemsElement = Array.from(document.querySelectorAll('.navItem'));
      navItemsElement.map((navItemElement,index) => {
         if (navItemElement === event.target) {
            setSelectedNavItem(index);
            localStorage.setItem('selectedNavItem', String(index));
         }
      })
   }

   useEffect(() => {
      if (localStorage.selectedNavItem !== null) {
         setSelectedNavItem(+localStorage.selectedNavItem);
      }
   }, [])


   const navItems = [
      { url: '/',          title: 'Мой день',      icon: GoSun,            amountTask: tasks.myDayList.length },
      { url: '/important', title: 'Важно',         icon: CiStar,           amountTask: tasks.importantList.length },
      { url: '/planed',    title: 'Запланировано', icon: LiaCalendarSolid, amountTask: tasks.planedList.length },
      { url: '/all',       title: 'Все',           icon: PiInfinityThin,   amountTask: tasks.allList.length },
      { url: '/tasks',     title: 'Задачи',        icon: PiHouse,          amountTask: tasks.tasksList.length },
   ];

   const [isSmallerThan1150] = useMediaQuery(`(max-width: ${(WIDTH_1150_PX)})`);

   if (isSmallerThan1150) return <></>

   return (
      <Box as='nav' display={isMenuOpen ? 'block' : 'none'}>
         <ToggleMenuIcon isNavBar={true} />
         <Stack spacing={3}>
            {
               navItems.map((navItem, index): ReactElement => {
                  return (
                     <Link key={index} to={navItem.url} onClick={e => handlerNavItems(e)}>
                        <Stack className='navItem' direction={'row'}>
                           <Box display={(index === selectedNavItem) ? 'block' : 'none'} 
                              w={'1px'} 
                              h={'auto'} 
                              bg={'blue.500'} />
                           <Stack direction={'row'} 
                              align={'center'} 
                              justify={'space-between'} 
                              pointerEvents='none' 
                              p={2} 
                              w={'100%'}
                           >
                              <Stack direction={'row'} align={'center'}>
                                 <Icon as={navItem.icon} boxSize={6} pointerEvents='none' />
                                 <Text pointerEvents='none'
                                    userSelect={'none'}
                                    fontWeight={(index === selectedNavItem) ? '700' : '400'}>
                                    {navItem.title}
                                 </Text>
                              </Stack>
                              <Text >
                                 {
                                    (navItem.amountTask > 0) ? navItem.amountTask : ''
                                 }
                              </Text>
                           </Stack>
                        </Stack>
                     </Link>
                  )
               })
            }
         </Stack>
      </Box>
   )
}