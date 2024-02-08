import { Box, Icon } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { FaHamburger } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toggleMenu } from "../redux/slices/menuSlice";
import { IToggleMenuIconProps } from "./types";


export const ToggleMenuIcon: FC<IToggleMenuIconProps> = ({ isNavBar }): ReactElement => {

   const dispatch = useDispatch();

   const isMenuOpen = useSelector((state: RootState) => state.menuSlice.isMenuOpen);

   function onToggleMenu() {
      dispatch(toggleMenu(!isMenuOpen));
   }

   if (isMenuOpen && !isNavBar) return <></>

   return (
      <Box p={(!isMenuOpen && !isNavBar) ? 0 : 4}>
         <Icon as={FaHamburger} 
            boxSize={8} 
            cursor={'pointer'}
            onClick={onToggleMenu} />
      </Box>
   )
}