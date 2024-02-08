import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './compomemts/App';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { MyDayPage } from './page/MyDayPage';

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
        element: <h1>important</h1>,
      },
      {
        path: '/planed',
        element: <h1>planed</h1>,
      },
      {
        path: '/all',
        element: <h1>all</h1>,
      },
      {
        path: '/completed',
        element: <h1>completed</h1>,
      },
      {
        path: '/tasks',
        element: <h1>tasks</h1>,
      },
    ]
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  // </StrictMode>
);
