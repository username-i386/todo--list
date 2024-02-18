import { Grid, GridItem } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TaskSettingsMenu } from "./TaskSettingsMenu";

export const App: FC = (): ReactElement => {

  const isMenuOpen = useSelector((state: RootState) => state.menuSlice.isMenuOpen);
  const isTaskMenuOpen = useSelector((state: RootState) => state.taskMenu.isOpen);
  const tasks = useSelector((state: RootState) => state.tasksSLice)
  console.log(tasks);


  function gridColumnsSize(): string {
    if (isMenuOpen && isTaskMenuOpen) {
      return '250px 1fr 350px';
    }

    if (isMenuOpen && !isTaskMenuOpen) {
      return '250px 1fr 0';
    }

    if (!isMenuOpen && isTaskMenuOpen) {
      return '0 1fr 350px';
    }

    if (!isMenuOpen && !isTaskMenuOpen) {
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
        <Main />
      </GridItem>
      <GridItem area={'taskMenu'}>
        <TaskSettingsMenu />
      </GridItem>
    </Grid>
  );
}
