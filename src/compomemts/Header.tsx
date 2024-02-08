import { Box, Highlight, Icon, Input, InputGroup, InputRightElement, Stack, Text } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { ImSearch } from "react-icons/im";
import { CiSettings } from "react-icons/ci";
import { ChangeColorMode } from "./ChangeColorMode";
import { LuListTodo } from "react-icons/lu";


export const Header: FC = (): ReactElement => {
   return (
      <Box as='header' p={2}>
         <Stack direction={'row'} justify={'space-between'} align={'center'}>
            <Stack direction={'row'} align={'center'}>
               <Icon as={LuListTodo} boxSize={8} color={'white'} />
               <Text color={'white'}>
                  <Highlight query={'TODO:'} styles={{ color: 'white', fontWeight: 800 }}>
                     TODO: list
                  </Highlight>
               </Text>
            </Stack>
            <Box w={'50%'}>
               <InputGroup>
                  <Input variant='filled' />
                  <InputRightElement pointerEvents='none'>
                     <ImSearch />
                  </InputRightElement>
               </InputGroup>
            </Box>
            <Stack direction={'row'}>
               <Icon as={CiSettings} boxSize={8} color={'white'} cursor={'pointer'} />
               <ChangeColorMode />
            </Stack>
         </Stack>
      </Box>
   )
}