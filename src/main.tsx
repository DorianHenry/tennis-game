import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import './styles/_index.scss';
import { Home } from './app/pages/Home';
import { Game } from './app/pages/Game';
import { FormPage } from './app/pages/FormPage';
import { ErrorPage } from './app/pages/Error/Error';
import { GameMatchLoader } from './app/loaders/game';
import store from './store/store';
import { ConfirmContextProvider } from './app/components/context/confirm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: 'game/:gameId',
    loader: GameMatchLoader,
    element: <Game />,
    errorElement: <ErrorPage />
  },
  {
    path: '/edit',
    element: <FormPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/edit/:gameId',
    element: <FormPage />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <ConfirmContextProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </ConfirmContextProvider>
  </Provider>
);
