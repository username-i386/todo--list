import { Grid, GridItem } from "@chakra-ui/react";
import { FC, ReactElement, useEffect } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskSettingsMenu } from "./TaskSettingsMenu";
import { Outlet } from "react-router-dom";
import { setNavbarToLocalStorage, setNotesToLocalStorage, setSubtasksToLocalStorage, setTaskListsToLocalStorage, setTaskMenuToLocalStorage } from "../utils/localStorage";

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


  function gridColumnsSize(): string {
    if (states.menuSlice.isMenuOpen && states.taskMenu.isOpen) {
      return '250px 1fr 350px';
    }

    if (states.menuSlice.isMenuOpen && !states.taskMenu.isOpen) {
      return '250px 1fr 0';
    }

    if (!states.menuSlice.isMenuOpen && states.taskMenu.isOpen) {
      return '0 1fr 350px';
    }

    if (!states.menuSlice.isMenuOpen && !states.taskMenu.isOpen) {
      return '0 1fr 0';
    }

    return '250px 1fr 0';
  }

  return (
    <Grid
      templateAreas={`"header header header"
                  "nav main taskMenu"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={gridColumnsSize()}
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
        <TaskSettingsMenu />
      </GridItem>
    </Grid>
  );
}
