import React from 'react';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { PanelPage } from './pages/Panel.page';
import { CreatePage } from './pages/Create.page';
import { routes } from './routes';

const router = createHashRouter([
  {
    path: routes.mainPage,
    element: <HomePage />,
  },
  {
    path: routes.create,
    element: <CreatePage />,
  },
  {
    path: routes.panel,
    element: <PanelPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
