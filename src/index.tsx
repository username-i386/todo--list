import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './compomemts/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MyDayPage } from './page/MyDayPage';
import { ImportantPage } from './page/ImportantPage';
import { PlanedPage } from './page/PlanedPage';
import { AllPage } from './page/AllPage';
import { TasksPage } from './page/TasksPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <MyDayPage />,
      },
      {
        path: '/important',
        element: <ImportantPage />,
      },
      {
        path: '/planed',
        element: <PlanedPage />,
      },
      {
        path: '/all',
        element: <AllPage />,
      },
      {
        path: '/tasks',
        element: <TasksPage />,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);
