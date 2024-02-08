import { Grid, GridItem } from "@chakra-ui/react";
import { FC, ReactElement } from "react";
import { Header } from "./Header";
import { NavBar } from "./NavBar";
import { Main } from "./Main";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const App: FC = (): ReactElement => {

  const isMenuOpen = useSelector((state: RootState) => state.menuSlice.isMenuOpen);
  const tasks = useSelector((state: RootState) => state.tasksSLice)
  console.log(tasks);

  const gridColumnsSize = isMenuOpen ? '250px 1fr' : '0px 1fr';

  return (
    <Grid
      templateAreas={`"header header"
                  "nav main"`}
      gridTemplateRows={'auto 1fr'}
      gridTemplateColumns={gridColumnsSize}
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
    </Grid>
  );
}
