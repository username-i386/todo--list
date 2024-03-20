import { IconButton,  Menu, MenuButton, MenuItem, MenuList, Show } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { FaHamburger } from "react-icons/fa";
import { WIDTH_1150_PX } from "../constants/windowWidth";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { GoSun } from "react-icons/go";
import { LiaCalendarSolid } from "react-icons/lia";
import { PiInfinityThin, PiHouse } from "react-icons/pi";


export const NavBarMobile: FC = (): ReactElement => {
    return (
        <Show breakpoint={`(max-width: ${WIDTH_1150_PX})`}>
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<FaHamburger />}
                    variant='outline'
                    color={'white'} />
                <MenuList>
                    <Link to={'/'}>
                        <MenuItem icon={<GoSun />}>
                            Мой день
                        </MenuItem>
                    </Link>
                    <Link to={'/important'}>
                        <MenuItem icon={<CiStar />}>
                            Важно
                        </MenuItem>
                    </Link>
                    <Link to={'/planed'}>
                        <MenuItem icon={<LiaCalendarSolid />}>
                            Запланировано
                        </MenuItem>
                    </Link>
                    <Link to={'/all'}>
                        <MenuItem icon={<PiInfinityThin />}>
                            Все
                        </MenuItem>
                    </Link>
                    <Link to={'/tasks'}>
                        <MenuItem icon={<PiHouse />}>
                            Задачи
                        </MenuItem>
                    </Link>
                </MenuList>
            </Menu>
        </Show>
    )
}