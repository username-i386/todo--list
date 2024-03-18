import { Box, Highlight, Icon, Stack, Text, useMediaQuery } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { ChangeColorMode } from "./ChangeColorMode";
import { LuListTodo } from "react-icons/lu";
import { SearchBar } from "./SearchBar";
import { NavBarMobile } from "./NavBarMobile";
import { WIDTH_450_PX } from "../constants/windowWidth";


export const Header: FC = (): ReactElement => {

   const [isSmallerThan450Px] = useMediaQuery(`(max-width: ${WIDTH_450_PX})`);
   
   const title: string = isSmallerThan450Px ? '' : 'TODO: list'
   return (
      <Box as='header' p={2}>
         <Stack direction={'row'} justify={'space-between'} align={'center'}>
            <Stack direction={'row'} align={'center'}>
               <Icon as={LuListTodo} boxSize={8} color={'white'} />
               <Text color={'white'}>
                  <Highlight query={'TODO:'} styles={{ color: 'white', fontWeight: 800 }}>
                     {title}
                  </Highlight>
               </Text>
            </Stack>
            <Box w={'50%'}>
               <SearchBar />
            </Box>
            <Stack direction={'row'} align={'center'}>
               <ChangeColorMode />
               <NavBarMobile />
            </Stack>
         </Stack>
      </Box>
   )
}