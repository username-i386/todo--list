import { Icon, useColorMode } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { MdSunny } from "react-icons/md";
import { PiMoonFill } from "react-icons/pi";

export const ChangeColorMode: FC = (): ReactElement => {

   const { colorMode, toggleColorMode } = useColorMode();
   
   return <Icon as={colorMode === 'light' ? PiMoonFill : MdSunny} boxSize={8} color={'white'} cursor={'pointer'} onClick={toggleColorMode}/>
}