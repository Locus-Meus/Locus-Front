import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { RequireAuth } from './require-auth';

import { SignInPage } from '@/pages/sign-in';
import { GalleryPage } from '@/pages/gallery';
import { CallbackPage } from '@/pages/callback';

const router = createBrowserRouter([
  // Public Routes
  { path: '/', element: <SignInPage /> },
  { path: '/sign-in', element: <SignInPage /> },
  { path: '/callback', element: <CallbackPage /> },

  {
    element: <RequireAuth />,
    children: [
      { path: '/gallery', element: <GalleryPage /> },
    ],
  },

  { path: '*', element: <Navigate to='/' replace /> },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
