import { Drawer, DrawerOverlay, DrawerContent,DrawerBody } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { toggleTaskMenu } from "../redux/slices/taskMenuSlice";
import { TaskSettingsMenu } from "./TaskSettingsMenu";


export const TaskSettingsMenuMobile: FC = (): ReactElement => {

    const dispatch: AppDispatch = useDispatch();

    const { isOpen } = useSelector((state: RootState) => state.taskMenu);

    function onCloseTaskMenu() {
        dispatch(toggleTaskMenu({
            isOpen: false,
            task: undefined,
        }));
    }

    return (
        <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onCloseTaskMenu}
            size={'xs'}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody>
                    <TaskSettingsMenu />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}