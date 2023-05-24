import React from 'react';
import ReactDOM from 'react-dom/client';
import { Home } from './app/pages/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './app/pages/Error/Error';
import './styles/_index.scss';
import { Game } from './app/pages/Game';
import { Provider } from 'react-redux';
import store from './store/store';
import { GameMatchLoader } from './app/loaders/game';

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
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
