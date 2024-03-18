import { Grid, GridItem, Hide, useMediaQuery } from "@chakra-ui/react";
import { FC, ReactElement, useEffect } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskSettingsMenu } from "./TaskSettingsMenu";
import { Outlet } from "react-router-dom";
import { setNavbarToLocalStorage, setNotesToLocalStorage, setSubtasksToLocalStorage, setTaskListsToLocalStorage, setTaskMenuToLocalStorage } from "../utils/localStorage";
import { gridColumnsSizeForDesktop, gridColumnsSizeForTablet } from "../utils/gridColumnSize";
import { WIDTH_1150_PX, WIDTH_900_PX } from "../constants/windowWidth";

export const App: FC = (): ReactElement => {

  const states = useSelector((state: RootState) => state);
  console.log(states.tasksSLice);
  

  useEffect(() => {
    setTaskListsToLocalStorage(states.tasksSLice);
  }, [states.tasksSLice])

  useEffect(() => {
    setSubtasksToLocalStorage(states.subtasks);
  }, [states.subtasks])

  useEffect(() => {
    setNotesToLocalStorage(states.notes);
  }, [states.notes])

  useEffect(() => {
    setNavbarToLocalStorage(states.menuSlice);
  }, [states.menuSlice])

  useEffect(() => {
    setTaskMenuToLocalStorage(states.taskMenu);
  }, [states.taskMenu])

  const [isSmallerThan1150] = useMediaQuery(`(max-width: ${(WIDTH_1150_PX)})`);
  const [isSmallerThan900] = useMediaQuery(`(max-width: ${(WIDTH_900_PX)})`);

  const gridColumnSize = (): string => {
    if (isSmallerThan900) {
      return '0 1fr 0';
    } else if (isSmallerThan1150) {
      return gridColumnsSizeForTablet(states.taskMenu.isOpen);
    } else {
      return gridColumnsSizeForDesktop(states.menuSlice.isMenuOpen, states.taskMenu.isOpen);
    }
  }

  return (
    <Grid
      templateAreas={`"header header header"
                      "nav main taskMenu"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={gridColumnSize()}
      h='100vh'
      w={'100%'}
    >
      <GridItem bg={'blue.500'} area={'header'}>
        <Header />
      </GridItem>
      <GridItem area={'nav'}>
        <NavBar />
      </GridItem>
      <GridItem area={'main'} overflow={'auto'}>
        <Outlet />
      </GridItem>
      <GridItem area={'taskMenu'}>
        <Hide breakpoint={`(max-width: ${WIDTH_900_PX})`}>
          <TaskSettingsMenu />
        </Hide>
      </GridItem>
    </Grid>
  );
}
