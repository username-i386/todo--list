import { Stack, Icon, Heading, Text, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { ToggleMenuIcon } from "./ToggleMenuIcon";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ITodoTitleProps } from "./types";
import { getLocalDate } from "../utils/getLocalDate";
import { WIDTH_1150_PX } from "../constants/windowWidth";


export const TodoTitle: FC<ITodoTitleProps> = ({ icon, title }): ReactElement => {

   const [isSmallerThan1150] = useMediaQuery(`(max-width: ${(WIDTH_1150_PX)})`);

   const dateTextColor = useColorModeValue('gray.600', 'gray.300');

   const isMenuOpen = useSelector((state: RootState) => state.menuSlice.isMenuOpen);

   function formatedDate(): string {
      return getLocalDate().today.dayName + ', ' + getLocalDate().today.day + ' ' + getLocalDate().monthName();
   }
   
   return (
      <Stack direction={'column'} p={4} gap={0} userSelect={'none'}>
         <Stack direction={'row'} align={'center'}>
            <ToggleMenuIcon isNavBar={false} />
               {
                  (isMenuOpen || isSmallerThan1150) ? <Icon as={icon} boxSize={8} /> : <></>
               }
            <Heading as='h2' size={'md'}>{title}</Heading>
         </Stack>
         <Text color={dateTextColor} fontSize={'xs'}>
            {formatedDate()}
         </Text>
      </Stack>
   )
}