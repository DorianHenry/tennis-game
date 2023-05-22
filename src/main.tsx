import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './app/pages/home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './app/pages/Error/error';
import './styles/index.scss';
import { Game } from './app/pages/game';
import { Provider } from 'react-redux';
import store from './store/store';
import { loadGame } from './app/loaders/game';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: 'game/:gameId',
    element: <Game />,
    loader: loadGame,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
